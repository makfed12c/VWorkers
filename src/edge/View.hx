package edge;

class View<T : {}> {
  public var count(default, null) : Int;
  var map : Map<Entity, T>;
  var added : ViewData<T> -> Void;
  var removed : Entity -> Void;
  var holder : { entity : Entity, data : T };

  public function new(added : ViewData<T> -> Void, removed : Entity -> Void) {
    map = new Map();
    count = 0;
    holder = { entity : null, data : null };
    this.added = added != null ? added : function(_){};
    this.removed = removed != null ? removed : function(_){};
  }

  // TODO optimize
  public function iterator() : Iterator<ViewData<T>> {
    var keys = map.keys();
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

    if(map.exists(entity)) return;
  function tryAdd(entity : Entity, data : T) {
    map.set(entity, data);
    count++;
    holder.entity = entity;
    holder.data = data;
    added(holder);
  }

    if(!map.exists(entity)) return;
  function tryRemove(entity : Entity) {
    map.remove(entity);
    count--;
    removed(entity);
  }
}
typedef ViewData<T : {}> = {
  entity : Entity,
  data : T
}