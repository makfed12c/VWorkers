package edge;

@:access(edge.Engine.addSystem)
@:access(edge.Engine.removeSystem)
@:access(edge.Engine.updateSystem)
@:access(edge.NodeSystem)
class Phase {
  var first : NodeSystem;
  var last : NodeSystem;
  var mapSystem : Map<ISystem, NodeSystem>;
  var mapType : Map<String, ISystem>;
  var engine : Engine;
  public function new(engine : Engine) {
    this.engine = engine;
    mapSystem = new Map();
    mapType = new Map();
  }

  public function add(system : ISystem) {
    remove(system);
    var node = createNode(system);
    if(null == first) {
      first = node;
      last = node;
    } else {
      node.prev = last;
      last.next = node;
      last = node;
    }
  }

  public function insertBefore(ref : ISystem, system : ISystem) {
    var noderef = mapSystem.get(ref);
    if(null == noderef)
      throw 'Phase.insertBefore: unable to find $ref system';
    var node = createNode(system);
    if(noderef == first) {
      node.next = noderef;
      noderef.prev = node;
      first = node;
    } else {
      var prev = noderef.prev;
      prev.next = node;
      node.prev = prev;
      node.next = noderef;
      noderef.prev = node;
    }
  }

  public function insertAfter(ref : ISystem, system : ISystem) {
    var noderef = mapSystem.get(ref);
    if(null == noderef)
      throw 'Phase.insertAfter: unable to find $ref system';
    var node = createNode(system);
    if(noderef == last) {
      node.prev = noderef;
      noderef.next = node;
      last = node;
    } else {
      var next = noderef.next;
      next.prev = node;
      node.next = next;
      node.prev = noderef;
      noderef.next = node;
    }
  }

  public function remove(system : ISystem) {
    var node = mapSystem.get(system);
    mapType.remove(key(system));
    if(null == node)
      return;
    if(null != engine)
      engine.removeSystem(system);
    mapSystem.remove(system);
    if(node == first && node == last) {
      first = last = null;
    } else if(node == first) {
      first = node.next;
      node.next.prev = null;
    } else if(node == last) {
      first = node.prev;
      node.prev.next = null;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
  }

  public function removeType(cls : Class<Dynamic>) {
    var system = mapType.get(Type.getClassName(cls));
    if(null == system)
      throw 'type system ${Type.getClassName(cls)} is not included in this Phase';
    return remove(system);
  }

  public function systems()
    return new NodeSystemIterator(first);

  public function update(t : Float) {
    if(null == engine) return;
    for(system in systems())
      engine.updateSystem(system, t);
  }

  function createNode(system : ISystem) {
    var node = new NodeSystem(system);
    mapSystem.set(system, node);
    mapType.set(key(system), system);
    if(null != engine)
      engine.addSystem(this, system);
    return node;
  }

  function key(system : ISystem)
    return Type.getClassName(Type.getClass(system));
}

class NodeSystem {
  public var system(default, null) : ISystem;
  public var next(default, null) : NodeSystem;
  public var prev(default, null) : NodeSystem;

  public function new(system : ISystem) {
    this.system = system;
  }
}

class NodeSystemIterator {
  var node : NodeSystem;
  public function new(node : NodeSystem) {
    this.node = node;
  }

  public function hasNext()
    return null != node;

  public function next() {
    var system = node.system;
    node = node.next;
    return system;
  }
}