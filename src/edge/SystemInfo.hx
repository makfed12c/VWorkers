package edge;

using thx.core.Arrays;

class SystemInfo {
  public var hasComponents(default, null) : Bool;
//  public var hasEntity(default, null) : Bool;
//  public var hasBefore(default, null) : Bool;
  public var before(default, null) : Dynamic;
  public var update(default, null) : Dynamic;
  public var components(default, null) : Map<Entity, Array<Dynamic>>;
  public var system(default, null) : ISystem;
  public var process(default, null) : ISystemProcess;

  public var collections(default, null) : Map<String, {
    classes : Array<Class<Dynamic>>,
    fields : Array<String>,
    view : View<Dynamic>
  }>;

  public function new(system : ISystem, process : ISystemProcess) {
    this.process = process;
    this.system        = system;
    this.hasComponents = null != system.componentRequirements && system.componentRequirements.length > 0;
//    this.hasEntity     = hasField(system, "entity");
//    this.hasBefore     = hasField(system, "before");
    this.update        = Reflect.field(system, "update");
    this.before        = null;
    this.components    = new Map();
    this.collections = new Map();
    if(null != system.entityRequirements) {
      var view = new View();
      this.collections.set("entities", {
        classes : system.entityRequirements.pluck(_.cls),
        fields : system.entityRequirements.pluck(_.name),
        view : view
      });
      Reflect.setField(system, "entities", view);
    }

//    if(hasBefore)
//      before = Reflect.field(system, "before");
  }

//  static function hasField(o : {}, field : String)
//    return Type.getInstanceFields(Type.getClass(o)).contains(field);
}