package edge.macro;

import haxe.macro.Context;
import haxe.macro.Expr;
using haxe.macro.TypeTools;
using haxe.macro.ComplexTypeTools;
using thx.macro.MacroFields;
using thx.macro.MacroTypes;

class BuildComponent {
  macro public static function complete() : Array<Field> {
    var fields = Context.getBuildFields();
    makePublic(fields);
    injectToString(fields);
    injectConstructor(fields);
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
    var info = getVarInfo(fields),
        cls  = BuildSystem.clsName().split(".").pop(),
        init = info
          .map(function(arg) return arg.name)
          .map(function(name) return macro this.$name = $i{name});
    fields.push({
      name: "new",
      doc: null,
      meta: [],
      access: [APublic],
      kind: FFun({
        ret : macro : Void,
        params : null,
        expr : macro $b{init},
        args : info.map(function(arg) return {
          value : null,
          type : arg.type,
          opt : false,
          name : arg.name
        })
      }),
      pos: Context.currentPos()
    });
  }

  static function injectToString(fields : Array<Field>) {
    var field = BuildSystem.findField(fields, "toString");
    if(null != field) return;
    var cls  = BuildSystem.clsName().split(".").pop(),
        info = getVarInfo(fields),
        args = info
          .map(function(arg) return '${arg.name}=$' + arg.name)
          .join(","),
        s = 'return \'$cls($args)\'';
    fields.push({
      name: "toString",
      doc: null,
      meta: [],
      access: [APublic],
      kind: FFun({
        ret : macro : String,
        params : null,
        expr : Context.parse(s, Context.currentPos()),
        args : []
      }),
      pos: Context.currentPos()
    });
  }

  static function getVarInfo(fields : Array<Field>) {
    return fields
      .map(function(field) return switch field.kind {
        case FVar(t, _) if(!field.isStatic()):
          { name : field.name, type : t }
        case _:
          null;
      })
      .filter(function(field) return field != null);
  }
}