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
    if(hasField(fields, "new")) return;
    var args = getVarAsFunctionArgs(fields),
        init = args
          .map(function(arg) return arg.name)
          .map(function(name) return macro this.$name = $i{name});
    fields.push(createFunctionField("new", args, macro $b{init}));
  }

  static function injectToString(fields : Array<Field>) {
    if(hasField(fields, "toString")) return;
    var cls  = clsName().split(".").pop(),
        args = getVarAsFunctionArgs(fields),
        params = args
          .map(function(arg) return '${arg.name}=$' + arg.name)
          .join(","),
        s = 'return \'$cls($params)\'';
    fields.push(createFunctionField(
      "toString",
      args,
      macro : String,
      Context.parse(s, Context.currentPos())));
  }
}