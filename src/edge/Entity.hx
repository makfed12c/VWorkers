package edge;

using thx.Arrays;
using thx.Functions;

@:access(edge.Engine)
class Entity {
  var map : Map<String, {}>;
  public var engine(default, null) : Engine;
  function new(engine : Engine, ?components : Array<{}>) {
    this.engine = engine;
    this.map = new Map();
    if(null != components)
      addMany(components);
  }

  public function add(component : {}) {
    if(null == engine) return;
    _add(component);
    engine.matchSystems(this);
  }

  public function addMany(components : Array<{}>) {
    if(null == engine) return;
    components.map.fn(_add(_));
    engine.matchSystems(this);
  }

  public function destroy() {
    if(null == engine) return;
    engine.remove(this);
    map = new Map();
  }

  public function exists(component : {})
    return existsType(Type.getClass(component));

  public function existsType(type : Class<{}>)
    return map.exists(Type.getClassName(type));

  public function remove(component : {}) {
    _remove(component);
    engine.matchSystems(this);
  }

  public function removeMany(components : Array<{}>) {
    components.map.fn(_remove(_));
    engine.matchSystems(this);
  }

  public function removeType(type : Class<{}>) {
    _removeTypeName(Type.getClassName(type));
    engine.matchSystems(this);
  }

  public function removeTypes(types : Array<Class<{}>>) {
    types.map.fn(_removeTypeName(Type.getClassName(_)));
    engine.matchSystems(this);
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

  function key(component : {}) {
    var t : Class<Dynamic> = Type.getClass(component),
        s = Type.getSuperClass(t);
    while(s != null && s != edge.IComponent) {
      t = s;
      s = Type.getSuperClass(t);
    }
    return Type.getClassName(t);
  }
}
