package edge.core.macro;

import haxe.macro.Context;
import haxe.macro.Expr;
using haxe.macro.TypeTools;
using haxe.macro.ComplexTypeTools;
using thx.macro.MacroFields;
using thx.macro.MacroTypes;

class Macros {
  public static function makeVarPublic(fields : Array<Field>) {
    fields.map(function(field) switch field.kind {
      case FVar(_, _) if(!field.isPublic()):
        field.access.push(APublic);
      case _:
    });
  }
}