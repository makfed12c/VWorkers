package edge.core.macro;

import haxe.macro.Context;
import haxe.macro.Expr;
using thx.macro.MacroFields;

import edge.core.macro.Macros.*;

class BuildComponent {
  macro public static function complete() : Array<Field> {
    var fields = Context.getBuildFields();
    makeVarsPublic(fields);
    injectToString(fields);
    injectConstructor(fields);
    return fields;
  }

  static function injectConstructor(fields : Array<Field>) {
    var field = findField(fields, "new");
    if(null != field) return;
    var info = getVarInfo(fields),
        init = info
          .map(function(arg) return arg.name)
          .map(function(name) return macro this.$name = $i{name});
    fields.push(createFunctionField("new", info, macro : Void, macro $b{init}));
  }

  static function injectToString(fields : Array<Field>) {
    if(null != findField(fields, "toString")) return;
    var cls  = clsName().split(".").pop(),
        info = getVarInfo(fields),
        args = info
          .map(function(arg) return '${arg.name}=$' + arg.name)
          .join(","),
        s = 'return \'$cls($args)\'';
    fields.push(createFunctionField(
      "toString",
      info,
      macro : String,
      Context.parse(s, Context.currentPos())));
  }

  static function getVarInfo(fields : Array<Field>) : Array<FunctionArg> {
    return fields
      .map(function(field) return switch field.kind {
        case FVar(t, _) if(!field.isStatic()):
          { name : field.name, type : t, opt : null, value : null }
        case _:
          null;
      })
      .filter(function(field) return field != null);
  }
}