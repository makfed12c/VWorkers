package edge.core.macro;

import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.ExprTools;
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
    injectToString(type, fields);
    injectConstructor(type, fields);
    makePublic(fields, "engine");
    makePublic(fields, "entity");
    makePublic(fields, "timeDelta");
    makePublic(fields, "before");
    injectSystemProcess(fields, Context.getLocalClass());
    return fields;
  }

  static function injectSystemProcess(fields : Array<Field>, cls : Ref<ClassType>) {
    var system = cls.toString(),
        process = '$system${PROCESS_SUFFIX}';

    BuildSystemProcess.createProcessType(system, process, fields);

    fields.push(createVarField("__process__", macro : edge.core.ISystemProcess));

    appendExprToFieldFunction(
      findField(fields, "new"),
      Context.parse('__process__ = new $process(this)', Context.currentPos())
    );
  }

  static function injectToString(type : ClassType, fields : Array<Field>) {
    if(isFieldInHirearchy(type, "toString")) return;
    var cls = clsName();
    fields.push(createFunctionField("toString", macro : String, macro return $v{cls}));
  }

  static function injectConstructor(type : ClassType, fields : Array<Field>) {
    if(hasField(fields, "new")) return;
    fields.push(createFunctionField(
      "new",
      isFieldInHirearchy(type, "new") ? macro super() : macro {}
    ));
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
        var ret = f.ret;
        if(null == ret) {
          ret = macro : Void;
        }
        switch ret {
          case macro : Void: // change return type to Bool
            var exprs = [
                  changeReturnFromVoidToBool(f.expr),
                  macro return true
                ];
            f.expr = macro $b{exprs};
            f.ret = macro : Bool;
          case macro : Bool: // you are good to go
          case _: Context.error('${clsName()}.update() return type is invalid: ${ret}', Context.currentPos());
        }
      case _:
    }
    if(!fieldHasMeta(field, ":keep"))
      field.meta.push({ name : ":keep", pos : Context.currentPos() });
  }

  static function changeReturnFromVoidToBool(expr) {
    return ExprTools.map(expr, function(e) {
      switch e.expr {
        case EReturn(v) if(v == null):
          return macro return true;
        case EReturn(v):
          return e;
        case ex:
          return changeReturnFromVoidToBool(e);
        };
    });
  }
}
