package edge.macro;

import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;
using haxe.macro.ComplexTypeTools;
using haxe.macro.TypeTools;
using thx.macro.MacroFields;
using thx.macro.MacroTypes;

class BuildSystem {
  macro public static function complete() : Array<Field> {
    var fields = Context.getBuildFields();
    checkUpdate(fields);
    injectComponentRequirements(fields);
    injectEntityRequirements(fields);
    injectToString(fields);
    injectConstructor(fields);
    return fields;
  }

  static function injectEntityRequirements(fields : Array<Field>) {
    var field = findField(fields, "entityRequirements");
    if(null != field) return;
    var entities = findField(fields, "entities");
    if(entities == null) {
      fields.push({
        name: "entityRequirements",
        doc: null,
        meta: [],
        access: [APublic],
        kind: FVar(
          macro : Array<{ name : String, cls : Class<Dynamic> }>,
          macro null
        ),
        pos: Context.currentPos()
      });
      return;
    }

    var types = switch entities.kind {
          case FVar(t, _):
            var tt = t.toType();
            switch [t, tt] {
              case [TPath(p), TInst(t, _)] if(t.toString() == "edge.View"):
                var param = p.params[0];
                switch param {
                  case TPType(TAnonymous(a)):
                    "[" + a.map(function(f) {
                      var t = switch f.kind { case FVar(TPath(o), _): Context.getType(o.name).toString(); case _: null; };
                      return t == "edge.Entity" ? null : '{ name : "${f.name}", cls : $t }';
                    })
                    .filter(function(s) return s != null)
                    .join(",") + "]";
                  case _:
                    null;
                }
              case _:
                null;
            };
          case _:
            null;
        };

    if(types == null) {
      Context.error('entities is not of type View<T: {}>', entities.pos);
    }

    fields.push({
      name: "entityRequirements",
      doc: null,
      meta: [],
      access: [APublic],
      kind: FVar(
        macro : Array<{ name : String, cls : Class<Dynamic> }>,
        Context.parse(types, Context.currentPos())
      ),
      pos: Context.currentPos()
    });
  }

  static function injectComponentRequirements(fields : Array<Field>) {
    var field = findField(fields, "componentRequirements");
    if(null != field) return;
    var update = findField(fields, "update"),
        arr = switch update.kind {
          case FFun(f):
            f.args.map(function(arg) return switch arg.type {
              case TPath(p):
                Context.getType(p.name).toString();
              case _:
                null;
            });
          case _:
            null;
        };

    fields.push({
      name: "componentRequirements",
      doc: null,
      meta: [],
      access: [APublic],
      kind: FVar(
        macro : Array<Dynamic>,
        Context.parse('[${arr.join(", ")}]', Context.currentPos())
      ),
      pos: Context.currentPos()
    });
  }

  static function injectToString(fields : Array<Field>) {
    var field = findField(fields, "toString"),
        cls = clsName();
    if(null != field) return;
    fields.push({
      name: "toString",
      doc: null,
      meta: [],
      access: [APublic],
      kind: FFun({
        ret : macro : String,
        params : null,
        expr : macro return $v{cls},
        args : []
      }),
      pos: Context.currentPos()
    });
  }

  static function injectConstructor(fields : Array<Field>) {
    var field = findField(fields, "new");
    if(null != field) return;
    fields.push({
      name: "new",
      doc: null,
      meta: [],
      access: [APublic],
      kind: FFun({
        ret : macro : Void,
        params : null,
        expr : macro {},
        args : []
      }),
      pos: Context.currentPos()
    });
  }

  static function checkUpdate(fields : Array<Field>) {
    var field = findField(fields, "update");
    if(field == null)
      Context.error('${clsName()} doesn\'t contain a method `update`', Context.currentPos());
    if(!field.isPublic())
      field.access.push(APublic);
    if(field.isStatic())
      Context.error('${clsName()}.update() cannot be static', Context.currentPos());
    if(!field.isMethod())
      Context.error('${clsName()}.update() must be method', Context.currentPos());
    switch field.kind {
      case FFun(f):
        for(arg in f.args) {
          switch arg.type {
            case TPath(p):
              if(p.params.length > 0)
                Context.error('argument `${arg.name}` of ${clsName()}.update() cannot have type parameters', Context.currentPos());
              var t = Context.getType(p.name);
              switch t {
                case TInst(s, _) if(s.toString() != "String"):
                  // TODO, should we support enums?
                case _:
                  Context.error('argument `${arg.name}` of ${clsName()}.update() is not a class instance', Context.currentPos());
              }
            case _:
              Context.error('argument `${arg.name}` of ${clsName()}.update() is not a class instance', Context.currentPos());
          }
        }
      case _:
    }
    if(!fieldHasMeta(field, ":keep"))
      field.meta.push({
        name : ":keep",
        params : [],
        pos : Context.currentPos()
      });
  }

  static function fieldHasMeta(field : Field, name : String) {
    if(field.meta == null) return false;
    for(meta in field.meta)
      if(meta.name == name)
        return true;
    return false;
  }

  public static function clsName()
    return Context.getLocalClass().toString();

  public static function findField(fields : Array<Field>, name : String) {
    for(field in fields) {
      if(field.name == name)
        return field;
    }
    return null;
  }
}