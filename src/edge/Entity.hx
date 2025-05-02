package edge;

using thx.core.Arrays;

@:access(edge.World)
class Entity {
  var map : Map<String, {}>;
  public var world(default, null) : World;
  public function new(?components : Array<{}>) {
    this.map = new Map();
    if(null != components)
      addMany(components);
  }

  public function add(component : {}) {
    _add(component);
    if(null != world)
      world.matchSystems(this);
  }

  public function addMany(components : Array<{}>) {
    components.pluck(_add(_));
    if(null != world)
      world.matchSystems(this);
  }

  public function exists(component : {})
    return existsType(key(component));

  public function existsType(type : String)
    return map.exists(type);

  public function remove(component : {}) {
    _remove(component);
    if(null != world)
      world.matchSystems(this);
  }

  public function removeMany(components : Array<{}>) {
    components.pluck(_remove(_));
    if(null != world)
      world.matchSystems(this);
  }

  public function removeType(type : Class<{}>) {
    _removeTypeName(Type.getClassName(type));
    if(null != world)
      world.matchSystems(this);
  }

  public function removeTypes(types : Array<Class<{}>>) {
    types.pluck(_removeTypeName(Type.getClassName(_)));
    if(null != world)
      world.matchSystems(this);
  }

  inline public function components()
    return map.iterator();

  function _add(component : {}) {
    var type = key(component);
    if(map.exists(type))
      remove(map.get(type));
    map.set(type, component);
  }

  function _remove(component : {}) {
    var type = key(component);
    _removeTypeName(type);
  }

  function _removeTypeName(type : String)
    map.remove(type);

  inline function key(component : {})
    return Type.getClassName(Type.getClass(component));
}