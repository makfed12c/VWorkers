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

  public function addComponents(components : Array<Dynamic>) {
    components.pluck(_addComponent(_));
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

  public function removeType(type : Class<Dynamic>) {
    _removeTypeName(Type.getClassName(type));
    if(null != world)
      world.matchSystems(this);
  }

  inline public function iterator()
    return components.iterator();

  function _addComponent(component : Dynamic) {
    var type = key(component);
    if(components.exists(type))
      removeComponent(components.get(type));
    components.set(type, component);
  }

  function _removeComponent(component : Dynamic) {
    var type = key(component);
    _removeTypeName(type);
  }

  function _removeTypeName(type : String)
    components.remove(type);

  inline function key(component : Dynamic)
    return Type.getClassName(Type.getClass(component));
}