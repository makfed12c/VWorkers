package edge.core.macro;

import haxe.macro.Context;
import haxe.macro.Expr;
using haxe.macro.ComplexTypeTools;
using haxe.macro.TypeTools;
import edge.core.macro.Macros.*;

class BuildSystemProcess {
  public static function createProcessType(systemName : String, processName : String, systemFields : Array<Field>) {
    var pack = processName.split('.'),
        name = pack.pop(),
        system = Context.getType(systemName).toComplexType(),
        fields = [],
        kind = TDClass(
          null,
          [{ pack : ['edge', 'core'], name : 'ISystemProcess' }],
          false
        );

    injectConstructor(system, fields);
    injectRemoveEntity(fields);
    injectAddEntity(fields);
    injectSystemField(system, fields);
    injectUpdate(systemFields, fields);
    injectViews(systemFields, fields);
    injectUpdateMatchRequirements(systemFields, fields);

    Context.defineType({
      pos : Context.currentPos(),
      params : [],
      pack : pack,
      name : name,
      meta : [{
          pos : Context.currentPos(),
          name : ":access",
          params : [macro edge.View]
        }],
      kind : kind,
      isExtern : false,
      fields : fields
    });
  }

  static function injectViews(systemFields : Array<Field>, fields : Array<Field>) {
    for(field in collectViewFields(systemFields)) {
      injectView(field, fields);
    }
  }

  static function injectView(info : { name : String, types : Array<Field>, field : Field }, fields : Array<Field>) {
    var name = info.name;
    makeFieldPublic(info.field);
    appendExprToFieldFunction(
      findField(fields, "new"),
      macro system.$name = new edge.View()
    );

    injectViewMatchRequirements(info, fields);
  }

  static function injectViewMatchRequirements(info : { name : String, types : Array<Field>, field : Field }, fields : Array<Field>) {
    var name   = info.name,
        types  = info.types,
        sexprs = [];
    sexprs.push('system.$name.remove(entity)');
    sexprs.push('var count = ' + types.length);
    sexprs.push('var o : {' +
      types.map(function(type) {
          var t = switch type.kind {
            case FVar(t, _): Context.follow(t.toType()).toComplexType();
            case _: null;
          };
          return '${type.name} : ${t.toString()}';
        }).join(", ") +
      '} = {' +
      types.map(function(type) return '${type.name} : null').join(", ") + '}');
    var expr = 'for(component in entity.components()) {\n';
    for(type in types) {
      var t = switch type.kind {
          case FVar(t, _): Context.follow(t.toType()).toComplexType();
          case _: null;
        };
      expr += '  if(Std.is(component, ${t.toString()})) {\n';
      expr += '    o.${type.name} = cast component;\n';
      expr += '    if(--count == 0) break; else continue;\n';
      expr += '  }\n';
    }
    expr += '}';
    sexprs.push(expr);
    sexprs.push('if(count == 0) system.$name.add(entity, o)');

    var exprs = sexprs.map(function(sexpr) return Context.parse(sexpr, Context.currentPos())),
        methodName = '${name}MatchRequirements';
    fields.push({
      name : methodName,
      access: [],
      kind: FFun({
        ret : macro : Void,
        params : null,
        expr : macro $b{exprs},
        args : [{
          name : "entity",
          type : macro : edge.Entity
        }]
      }),
      pos: Context.currentPos()
    });

    appendExprToFieldFunction(
      findField(fields, "addEntity"),
      Context.parse('$methodName(entity)', Context.currentPos())
    );

    appendExprToFieldFunction(
      findField(fields, "removeEntity"),
      Context.parse('system.$name.remove(entity)', Context.currentPos())
    );
  }

  static function injectUpdate(systemFields : Array<Field>, fields : Array<Field>) {
    var exprs = [];
    if(hasVarField(systemFields, "engine"))
      exprs.push(macro system.engine = engine);
    if(hasVarField(systemFields, "timeDelta"))
      exprs.push(macro system.timeDelta = delta);
    if(hasFunField(systemFields, "before"))
      exprs.push(macro system.before());

    var update = findField(systemFields, "update"),
        constructor = findField(fields, "new");

    if(fieldFunctionHasArguments(update)) {
      var args = fieldFunctionArguments(update),
          fieldTypes = args.map(function(arg) : Field {
              var t = Context.follow(arg.type.toType()).toComplexType(),
                  kind : FieldType = FVar(t, null);
              return {
                pos  : Context.currentPos(),
                name : arg.name,
                kind : kind
              };
            }),
          type = TPath({
              pack : ["edge"],
              name : "View",
              params : [TPType(TAnonymous(fieldTypes))]
            });
      fields.push({
        name : "updateItems",
        kind: FVar(type, null),
        pos: Context.currentPos()
      });
      appendExprToFieldFunction(
        findField(fields, "removeEntity"),
        macro updateItems.remove(entity));
      // inject constructor init
      appendExprToFieldFunction(constructor, macro updateItems = new edge.View());
      // create loop expression
      exprs.push(macro var data);
      var expr = '\nfor(item in updateItems) {\n';
      // set entity if required
      if(hasVarField(systemFields, "entity"))
        expr += '  system.entity = item.entity;\n';
      // call update
      expr += '  data = item.data;\n';
      expr += '  system.update(' + args.map(function(arg) {
          return 'data.${arg.name}';
        }).join(", ") + ');\n';
      expr += '}';
      exprs.push(Context.parse(expr, Context.currentPos()));
    } else {
      exprs.push(macro system.update());
    }

    fields.push({
      name : "update",
      access: [APublic],
      kind: FFun({
        ret : macro : Void,
        params : null,
        expr : macro $b{exprs},
        args : [{
          name : "engine",
          type : macro : edge.Engine
        }, {
          name : "delta",
          type : macro : Float
        }]
      }),
      pos: Context.currentPos()
    });
  }

  static function injectUpdateMatchRequirements(systemFields : Array<Field>, fields : Array<Field>) {
    var args = fieldFunctionArguments(findField(systemFields, "update"));
    if(args.length == 0) return;

    var sexprs = [];
    sexprs.push('updateItems.remove(entity)');
    sexprs.push('var count = ' + args.length);
    sexprs.push('var o : {' + args.map(function(arg) return '${arg.name} : ${Context.follow(arg.type.toType()).toComplexType().toString()}').join(", ") + '} = {' + args.map(function(arg) return '${arg.name} : null').join(", ") + '}');

    var expr = 'for(component in entity.components()) {\n';
    for(arg in args) {
      var t = Context.follow(arg.type.toType()).toComplexType().toString();
      expr += '  if(Std.is(component, $t)) {\n';
      expr += '    o.${arg.name} = cast component;\n';
      expr += '    if(--count == 0) break; else continue;\n';
      expr += '  }\n';
    }
    expr += '}';
    sexprs.push(expr);

    sexprs.push('if(count == 0) updateItems.add(entity, o)');

    var exprs = sexprs.map(function(sexpr) return Context.parse(sexpr, Context.currentPos()));
    fields.push({
      name : "updateMatchRequirements",
      access: [],
      kind: FFun({
        ret : macro : Void,
        params : null,
        expr : macro $b{exprs},
        args : [{
          name : "entity",
          type : macro : edge.Entity
        }]
      }),
      pos: Context.currentPos()
    });

    appendExprToFieldFunction(
      findField(fields, "addEntity"),
      macro updateMatchRequirements(entity));
  }

  static function injectRemoveEntity(fields : Array<Field>) {
    fields.push({
      name : "removeEntity",
      access: [APublic],
      kind: FFun({
        ret : macro : Void,
        params : null,
        expr : macro {},
        args : [{
          name : "entity",
          type : macro : edge.Entity
        }]
      }),
      pos: Context.currentPos()
    });
  }

  static function injectAddEntity(fields : Array<Field>) {
    fields.push({
      name : "addEntity",
      access: [APublic],
      kind: FFun({
        ret : macro : Void,
        params : null,
        expr : macro {},
        args : [{
          name : "entity",
          type : macro : edge.Entity
        }]
      }),
      pos: Context.currentPos()
    });
  }

  static function injectSystemField(system : ComplexType, fields : Array<Field>) {
    fields.push({
      name : "system",
      kind: FVar(system, null),
      pos: Context.currentPos()
    });
  }

  static function injectConstructor(system : ComplexType, fields : Array<Field>) {
    fields.push({
      name: "new",
      access: [APublic],
      kind: FFun({
        ret : macro : Void,
        params : null,
        expr : macro this.system = system,
        args : [{
          name : "system",
          type : system
        }]
      }),
      pos: Context.currentPos()
    });
  }

  static function collectViewFields(fields : Array<Field>) : Array<{ name : String, types : Array<Field>, field : Field }> {
    var results = [];
    for(field in fields) {
      switch field.kind {
        case FVar(tp, _):
          if(tp == null) continue;
          tp = Context.follow(tp.toType()).toComplexType();
          switch tp {
            case TPath({ name : "View", pack : ["edge"], params : [TPType(TAnonymous(p))] }):
              results.push({
                name  : field.name,
                types : p,
                field : field
              });
            case _:
          };
        case _:
      }
    }
    return results;
  }
}