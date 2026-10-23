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
  public static function createProcessType(systemName, processName, fields) {
    //Context.defineType();
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