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
      pack : pack,
      name : name,
      meta : [{
          pos : Context.currentPos(),
          name : ":access",
          params : [macro edge.View]
        }],
      kind : kind,
      fields : fields
    });
  }

  static function injectViews(systemFields : Array<Field>, fields : Array<Field>)
    for(field in collectViewFields(systemFields))
      injectView(field, systemFields, fields);

  static function injectView(info : { name : String, types : Array<Field>, field : Field }, systemFields : Array<Field>, fields : Array<Field>) {
    var name = info.name;
    makeFieldPublic(info.field);
    appendExprToFieldFunction(
      findField(fields, "new"),
      Context.parse('system.$name = new edge.View()', Context.currentPos())
    );

    injectViewMatchRequirements(info, systemFields, fields);
  }

  static function injectViewMatchRequirements(info : { name : String, types : Array<Field>, field : Field }, systemFields : Array<Field>, fields : Array<Field>) {
    var name   = info.name,
        types  = info.types,
        sexprs = [];

    sexprs.push('var removed = system.$name.tryRemove(entity)');
    sexprs.push('var count = ' + types.length);
    sexprs.push('var o : {' +
      types.map(function(type) {
          return type.name + " : " + switch type.kind {
            case FVar(t, _): Context.follow(t.toType()).toComplexType().toString();
            case _: "";
          };
        }).join(", ") +
      '} = {' +
      types.map(function(type) return '${type.name} : null').join(", ") + '}');
    var expr = 'for(component in entity.components()) {\n';
    for(type in types) {
      var t = switch type.kind {
          case FVar(t, _): Context.follow(t.toType()).toComplexType().toString();
          case _: "";
        };
      expr += '  if(Std.is(component, $t)) {\n';
      expr += '    o.${type.name} = cast component;\n';
      expr += '    if(--count == 0) break; else continue;\n';
      expr += '  }\n';
    }
    expr += '}';
    sexprs.push(expr);
    sexprs.push('var added = count == 0 && system.$name.tryAdd(entity, o)');

    if(hasFunField(systemFields, '${name}Removed')) {
      sexprs.push('if((null != removed) && !added) system.${name}Removed(entity, removed)');
    }
    if(hasFunField(systemFields, '${name}Added')) {
      sexprs.push('if(added && (null == removed)) system.${name}Added(entity, o)');
    }

    var exprs = sexprs.map(function(sexpr) return Context.parse(sexpr, Context.currentPos())),
        methodName = '${name}MatchRequirements';
    fields.push(createFunctionField(
        methodName,
        [{ name : "entity", type : macro : edge.Entity }],
        macro $b{exprs}
      ));

    appendExprToFieldFunction(
      findField(fields, "addEntity"),
      Context.parse('$methodName(entity)', Context.currentPos())
    );

    expr = hasFunField(systemFields, '${name}Removed') ?
      '{ var removed = system.$name.tryRemove(entity); if(removed != null) system.${name}Removed(entity, removed); }' :
      'system.$name.tryRemove(entity)';
    appendExprToFieldFunction(
      findField(fields, "removeEntity"),
      Context.parse(expr, Context.currentPos())
    );
  }

  static function injectUpdate(systemFields : Array<Field>, fields : Array<Field>) {
    var exprs = [];
    if(hasVarField(systemFields, "engine"))
      exprs.push(macro system.engine = engine);
    if(hasVarField(systemFields, "timeDelta"))
      exprs.push(macro system.timeDelta = delta);

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
      fields.push(createVarField("updateItems", type));

      var expr = hasFunField(systemFields, 'updateRemoved') ?
        '{ var removed = updateItems.tryRemove(entity); if(removed != null) system.updateRemoved(entity, removed); }' :
        'updateItems.tryRemove(entity)';
      appendExprToFieldFunction(
        findField(fields, "removeEntity"),
        Context.parse(expr, Context.currentPos())
      );

      appendExprToFieldFunction(
        constructor,
        macro updateItems = new edge.View()
      );

      if(hasFunField(systemFields, "before"))
        exprs.push(macro if(updateItems.count > 0) system.before());
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
      if(hasFunField(systemFields, "before"))
        exprs.push(macro system.before());
      exprs.push(macro system.update());
    }
    if(hasFunField(systemFields, "after"))
      exprs.push(macro system.after());

    fields.push(createFunctionField(
        "update",
        [{ name : "engine", type : macro : edge.Engine },
         { name : "delta", type : macro : Float }],
        macro $b{exprs}
      ));
  }

  static function injectUpdateMatchRequirements(systemFields : Array<Field>, fields : Array<Field>) {
    var args = fieldFunctionArguments(findField(systemFields, "update"));
    if(args.length == 0) return;

    var sexprs = [];
    sexprs.push('var removed = updateItems.tryRemove(entity)');
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

    sexprs.push('var added = count == 0 && updateItems.tryAdd(entity, o)');

    if(hasFunField(systemFields, 'updateRemoved')) {
      sexprs.push('if((null != removed) && !added) system.updateRemoved(entity, removed)');
    }
    if(hasFunField(systemFields, 'updateAdded')) {
      sexprs.push('if(added && (null == removed)) system.updateAdded(entity, o)');
    }

    var exprs = sexprs.map(function(sexpr) return Context.parse(sexpr, Context.currentPos()));
    fields.push(createFunctionField(
        "updateMatchRequirements",
        [{ name : "entity", type : macro : edge.Entity }],
        macro $b{exprs}
      ));

    appendExprToFieldFunction(
      findField(fields, "addEntity"),
      macro updateMatchRequirements(entity));
  }

  static function injectRemoveEntity(fields : Array<Field>)
    fields.push(createFunctionField(
        "removeEntity",
        [{ name : "entity", type : macro : edge.Entity }]
      ));

  static function injectAddEntity(fields : Array<Field>)
    fields.push(createFunctionField(
        "addEntity",
        [{ name : "entity", type : macro : edge.Entity }]
      ));

  static function injectSystemField(system : ComplexType, fields : Array<Field>)
    fields.push(createVarField("system", system));

  static function injectConstructor(system : ComplexType, fields : Array<Field>)
    fields.push(createFunctionField(
        "new",
        [{ name : "system", type : system }],
        macro this.system = system
      ));

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
