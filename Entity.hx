package edge;

using thx.core.Arrays;

@:access(edge.World)
class Entity {
  var components : Map<String, Dynamic>;
  var world : World;
  public function new(?components : Array<Dynamic>) {
    this.components = new Map();
    if(null != components)
      addComponents(components);
  }

  public function addComponent(component : Dynamic) {
    _addComponent(component);
    if(null != world)
      world.matchSystems(this);
  }

  function _addComponent(component : Dynamic) {
    var type = key(component);
    if(components.exists(type))
      removeComponent(components.get(type));
    components.set(type, component);
  }

  public function addComponents(components : Array<Dynamic>) {
    components.pluck(_addComponent(_));
    if(null != world)
      world.matchSystems(this);
  }

  function _removeComponent(component : Dynamic) {
    var type = key(component);
    components.remove(component);
    if(null != world)
      world.matchSystems(this);
  }

  public function removeComponent(component : Dynamic) {
    _removeComponent(component);
    if(null != world)
      world.matchSystems(this);
  }

  public function removeComponents(components : Array<Dynamic>) {
    components.pluck(_removeComponent(_));
    if(null != world)
      world.matchSystems(this);
  }

  inline function key(component : Dynamic)
    return Type.getClassName(Type.getClass(component));

  function matchRequirements(requirements : Array<Class<Dynamic>>) {
    var comps = [];
    for(component in components) {
      for(req in requirements) {
        if(Type.getClass(component) == req)
          comps.push(component);
      }
    }
    return comps.length == requirements.length ? comps : [];
  }
}