package edge.core.macro;

import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;
using thx.macro.MacroFields;
import Type in RType;

class Macros {
  public static function getVarAsFunctionArgs(fields : Array<Field>) : Array<FunctionArg> {
    return fields
      .map(function(field) return switch field.kind {
        case FVar(t, _) if(!field.isStatic()):
          { name : field.name, type : t, opt : null, value : null }
        case _:
          null;
      })
      .filter(function(field) return field != null);
  }

  public static function createVarField(name : String, type : ComplexType) : Field {
    return {
      name: name,
      kind: FVar(type, null),
      pos: Context.currentPos()
    };
  }

  public static function createFunctionField(name : String, ?args : Array<FunctionArg>, ?ret : ComplexType, ?expr : Expr) : Field {
    return {
      name: name,
      access: [APublic],
      kind: FFun({
        ret  : null != ret ? ret : macro : Void,
        expr : null != expr ? expr : macro {},
        args : null != args ? args : []
      }),
      pos: Context.currentPos()
    };
  }

  public static function makeVarsPublic(fields : Array<Field>) {
    fields.map(function(field) switch field.kind {
      case FVar(_, _) if(!field.isPublic()):
        field.access.push(APublic);
      case _:
    });
  }

  public static function makePublic(fields : Array<Field>, name : String) {
    var field = findField(fields, name);
    if(null == field) return;
    makeFieldPublic(field);
  }

  public static function makeFieldPublic(field : Field) {
    if(isPublic(field)) return;
    field.access.push(APublic);
  }

  public static function isPublic(field : Field) {
    for(a in field.access)
      if(RType.enumEq(a, APublic))
        return true;
    return false;
  }

  public static function hasField(fields : Array<Field>, name : String)
    return null != findField(fields, name);

  public static function findField(fields : Array<Field>, name : String) {
    for(field in fields)
      if(field.name == name)
        return field;
    return null;
  }

  public static function findClassField(fields : Array<ClassField>, name : String) {
    for(field in fields) {
      if(field.name == name)
        return field;
    }
    return null;
  }

  public static function hasClassField(fields : Array<ClassField>, name : String)
    return findClassField(fields, name) != null;

  public static function isFieldInHirearchy(type : ClassType, name : String) : Bool {
    if(name == "new") {
      if(null != type.constructor)
        return true;
    } else {
      if(hasClassField(type.fields.get(), name))
        return true;
    }
    var superClass = type.superClass;
    if(null == superClass) {
      return false;
    }
    return isFieldInHirearchy(superClass.t.get(), name);
  }

  public static function hasVarField(fields : Array<Field>, fieldName : String) {
    for(field in fields)
      if(field.name == fieldName && switch field.kind {
        case FVar(_, _): true;
        case _: false;
      })
        return true;
    return false;
  }

  public static function hasFunField(fields : Array<Field>, fieldName : String) {
    for(field in fields)
      if(field.name == fieldName && switch field.kind {
        case FFun(_): true;
        case _: false;
      })
        return true;
    return false;
  }

  public static function fieldHasMeta(field : Field, name : String) {
    if(field.meta == null) return false;
    for(meta in field.meta)
      if(meta.name == name)
        return true;
    return false;
  }

  inline public static function clsName()
    return Context.getLocalClass().toString();

  public static function appendExprToFieldFunction(field : Field, expr : Expr) {
    switch field.kind {
      case FFun(o):
        var exprs = [o.expr, expr];
        o.expr = macro $b{exprs};
      case _:
    }
  }

  public static function fieldFunctionHasArguments(field : Field) {
    switch field.kind {
      case FFun(o):
        return o.args.length > 0;
      case _:
        return false;
    }
  }

  public static function fieldFunctionArguments(field : Field) {
    switch field.kind {
      case FFun(o):
        return o.args;
      case _:
        return null;
    }
  }
}