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
          null,
          [{ pack : ['edge'], name : 'ISystemProcess' }],
          false
        );

    injectConstructor(system, fields);
    injectSystemField(system, fields);
    injectSetEngine(systemFields, fields);

    Context.defineType({
      pos : Context.currentPos(),
      params : [],
      pack : pack,
      name : name,
      meta : [],
      kind : kind,
      isExtern : false,
      fields : fields
    });
  }

  static function injectSetEngine(systemFields : Array<Field>, fields : Array<Field>) {
    var exprs = [];
    if(BuildSystem.hasVarField(systemFields, "engine"))
      exprs.push(macro system.engine = engine);
    if(BuildSystem.hasVarField(systemFields, "timeDelta"))
      exprs.push(macro system.timeDelta = delta);

    fields.push({
      name : "update",
      access: [APublic],
      kind: FFun({
        ret : macro : Void,
        params : null,
        expr : macro $b{exprs},
        args : [{
          name : "engine",
          type : macro : edge.Engine
        }, {
          name : "delta",
          type : macro : Float
        }]
      }),
      pos: Context.currentPos()
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
        expr : macro this.system = system,
        args : [{
          name : "system",
          type : system
        }]
      }),
      pos: Context.currentPos()
    });
  }
}