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

  function tryAdd(entity : Entity, data : T) {
    if(map.exists(entity)) return false;
    map.set(entity, data);
    count++;
    return true;
  }

  function tryRemove(entity : Entity) {
    if(!map.exists(entity)) return false;
    map.remove(entity);
    count--;
    return true;
  }
}
typedef ViewData<T : {}> = {
  entity : Entity,
  data : T
}