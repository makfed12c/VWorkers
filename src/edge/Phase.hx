package edge;

import edge.core.NodeSystem;
import edge.core.NodeSystemIterator;

@:access(edge.Engine.addSystem)
@:access(edge.Engine.removeSystem)
@:access(edge.Engine.updateSystem)
@:access(edge.core.NodeSystem)
class Phase {
  var first : NodeSystem;
  var last : NodeSystem;
  var mapSystem : Map<ISystem, NodeSystem>;
  var mapType : Map<String, ISystem>;
  var engine : Engine;
  var phases : Array<Phase>;
  public var enabled : Bool;
  public function new(engine : Engine) {
    this.engine = engine;
    mapSystem = new Map();
    mapType = new Map();
    phases = [];
    enabled = true;
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

  public function createPhase() {
    var phase = engine.createPhase();
    phases.push(phase);
    return phase;
  }

  public function clearSystems()
    for(system in systems())
      remove(system);

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
    engine.removeSystem(system);
    mapSystem.remove(system);
    if(node == first && node == last) {
      first = last = null;
    } else if(node == first) {
      first = node.next;
      node.next.prev = null;
    } else if(node == last) {
      last = node.prev;
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
    if(!enabled) return;
    var result;
    for(system in systems()) {
      result = engine.updateSystem(system, t);
      if(!result) return;
    }
    for(phase in phases) {
      phase.update(t);
    }
  }

  function createNode(system : ISystem) {
    var node = new NodeSystem(system);
    mapSystem.set(system, node);
    mapType.set(key(system), system);
    engine.addSystem(system);
    return node;
  }

  function key(system : ISystem)
    return Type.getClassName(Type.getClass(system));
}
