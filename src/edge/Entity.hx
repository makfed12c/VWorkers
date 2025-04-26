package edge;

using thx.core.Arrays;

@:access(edge.World)
class Entity {
  var components : Map<String, Dynamic>;
  public var world(default, null) : World;
  public function new(?components : Array<Dynamic>) {
    this.components = new Map();
    if(null != components)
      addMany(components);
  }

  public function add(component : Dynamic) {
    _add(component);
    if(null != world)
      world.matchSystems(this);
  }

  public function addMany(components : Array<Dynamic>) {
    components.pluck(_add(_));
    if(null != world)
      world.matchSystems(this);
  }

  public function exists(component : Dynamic)
    return existsType(key(component));

  public function existsType(type : String)
    return components.exists(type);

  public function remove(component : Dynamic) {
    _remove(component);
    if(null != world)
      world.matchSystems(this);
  }

  public function removeMany(components : Array<Dynamic>) {
    components.pluck(_remove(_));
    if(null != world)
      world.matchSystems(this);
  }

  public function removeType(type : Class<Dynamic>) {
    _removeTypeName(Type.getClassName(type));
    if(null != world)
      world.matchSystems(this);
  }

  public function removeTypes(types : Array<Class<Dynamic>>) {
    types.pluck(_removeTypeName(Type.getClassName(_)));
    if(null != world)
      world.matchSystems(this);
  }

  inline public function iterator()
    return components.iterator();

  function _add(component : Dynamic) {
    var type = key(component);
    if(components.exists(type))
      remove(components.get(type));
    components.set(type, component);
  }

  function _remove(component : Dynamic) {
    var type = key(component);
    _removeTypeName(type);
  }

  function _removeTypeName(type : String)
    components.remove(type);

  inline function key(component : Dynamic)
    return Type.getClassName(Type.getClass(component));
}