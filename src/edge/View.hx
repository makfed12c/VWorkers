package edge;

class View<T : {}> {
  public var count(default, null) : Int;
  var map : Map<Entity, T>;
  public function new() {
    map = new Map();
    count = 0;
  }

  // TODO optimize
  public function iterator() : Iterator<ViewData<T>> {
    var keys = map.keys(),
        holder = { entity : null, data : null };
    return {
      hasNext : function() {
        return keys.hasNext();
      },
      next : function() {
        var key = keys.next();
        holder.entity = key;
        holder.data = map.get(key);
        return holder;
      }
    };
  }

  public function added(item : ViewData<T>) {}

  public function removed(entity : Entity) {}

  function add(entity : Entity, data : T) {
    if(map.exists(entity)) return;
    map.set(entity, data);
    count++;
  }

  function remove(entity : Entity) {
    if(!map.exists(entity)) return;
    map.remove(entity);
    count--;
  }
}
typedef ViewData<T : {}> = {
  entity : Entity;
  data : T;
}