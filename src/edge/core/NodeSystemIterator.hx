package edge.core;

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