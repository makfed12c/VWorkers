package edge.core;

class NodeSystem {
  public var system(default, null) : ISystem;
  public var next(default, null) : NodeSystem;
  public var prev(default, null) : NodeSystem;

  public function new(system : ISystem) {
    this.system = system;
  }
}