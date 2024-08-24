package edge;

using thx.core.Arrays;

class Entity {
  var components : Map<String, Dynamic>;
  public function new() {
    components = new Map();
  }

  public function addComponent(component : Dynamic) {
    var type = key(component);
    if(components.exists(type))
      removeComponent(components.get(type));
    components.set(type, component);
  }

  public function addComponents(components : Array<Dynamic>)
  components.pluck(addComponent(_));

  public function removeComponent(component : Dynamic) {
    var type = key(component);
    components.remove(component);
  }

  inline function key(component : Dynamic)
    return Type.getClassName(Type.getClass(component));
}