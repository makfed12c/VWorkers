package edge.macro;

import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;
using haxe.macro.ComplexTypeTools;
using haxe.macro.TypeTools;
using thx.macro.MacroFields;
using thx.macro.MacroTypes;
using thx.core.Strings;

class BuildSystemProcess {
  public static function createProcessType(systemName : String, processName : String, systemFields : Array<Field>) {
    var pack = processName.split('.'),
        name = pack.pop(),
        system = Context.getType(systemName).toComplexType(),
        fields = [],
        kind = TDClass(
          { pack : ['edge'], name : 'SystemProcess' }, // null, // superClass:TypePath,
          [], // interfaces:Array<TypePath>
          false
        );

    injectConstructor(system, fields);
    injectSystemField(system, fields);

    Context.defineType({
      pos : Context.currentPos(),
      params : [],
      pack : pack,
      name : name,
      meta : null,
      kind : kind,
      isExtern : false,
      fields : fields
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
        expr : macro {
          super();
          this.system = system;
        },
        args : [{
          name : "system",
          type : system
        }]
      }),
      pos: Context.currentPos()
    });
  }
/*
  static function onTypeNotFound(name : String) {
    if(!isSystemProcess(name)) return null;
    return buildProcessClass(name);
  }

  static function buildProcessClass(name : String) {
    var system = systemName(name);
    trace(name);
    var type = try Context.getType(system) catch(_: Dynamic) null;
    trace(type);
    trace(system);
    return null;
  }

  static function isSystemProcess(processName : String) {
    return processName.endsWith(PROCESS_SUFFIX);
  }

  static function systemName(processName : String)
    return processName.substring(0, processName.length - PROCESS_SUFFIX.length);
*/
}