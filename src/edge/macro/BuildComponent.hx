package edge.macro;

import haxe.macro.Context;
import haxe.macro.Expr;
using haxe.macro.TypeTools;
using thx.macro.MacroFields;
using thx.macro.MacroTypes;

class BuildComponent {
  macro public static function complete() : Array<Field> {
    var fields = Context.getBuildFields();
    makePublic(fields);
    injectToString(fields);
    injectConstructor(fields);
    /*
    var newField = {
      name: fieldName,
      doc: null,
      meta: [],
      access: [AStatic, APublic],
      kind: FVar(macro : String,
        macro "my default"),
      pos: Context.currentPos()
    };
    fields.push(newField);
    */

    return fields;
  }

  static function makePublic(fields : Array<Field>) {
    fields.map(function(field) switch field.kind {
      case FVar(_, _) if(!field.isPublic()):
        field.access.push(APublic);
      case _:
    });
  }

  static function injectConstructor(fields : Array<Field>) {
    var field = BuildSystem.findField(fields, "new");
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

  static function injectToString(fields : Array<Field>) {
    var field = BuildSystem.findField(fields, "toString");
    if(null != field) return;
    var cls = BuildSystem.clsName().split(".").pop();
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
}