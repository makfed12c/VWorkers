package edge.core.macro;

import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;
using haxe.macro.TypeTools;
using thx.macro.MacroFields;
import edge.core.macro.Macros.*;

class BuildSystem {
  public inline static var PROCESS_SUFFIX = "_SystemProcess";

  macro public static function complete() : Array<Field> {
    var fields = Context.getBuildFields(),
        type = Context.getLocalClass().get();
    checkUpdate(fields);
    injectComponentRequirements(fields);
    injectToString(type, fields);
    injectConstructor(type, fields);
    makePublic(fields, "engine");
    makePublic(fields, "entity");
    makePublic(fields, "timeDelta");
    injectSystemProcess(fields, Context.getLocalClass());
    return fields;
  }

  static function injectSystemProcess(fields : Array<Field>, cls : Ref<ClassType>) {
    var system = cls.toString(),
        process = '$system${PROCESS_SUFFIX}';

    BuildSystemProcess.createProcessType(system, process, fields);

    fields.push({
      name: "__process__",
      kind: FVar(macro : edge.core.ISystemProcess, null),
      pos: Context.currentPos()
    });

    appendExprToFieldFunction(
      findField(fields, "new"),
      Context.parse('__process__ = new $process(this)', Context.currentPos())
    );
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

  static function injectToString(type : ClassType, fields : Array<Field>) {
    if(isFieldInHirearchy(type, "toString")) return;
    var cls = clsName();
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

  static function injectConstructor(type : ClassType, fields : Array<Field>) {
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
        expr :
          isFieldInHirearchy(type, "new") ?
            macro super() :
            macro {},
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
}