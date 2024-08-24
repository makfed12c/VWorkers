package edge;

class World {
//  var entities : Map<Entity>;
//  var updates : Array<
  public function new() {
//    entities = [];
  }

  public function addEntity(entity : Entity) {

  }

  public function removeEntity(entity : Entity) {

  }

  public function addSystem(system : ISystem<Dynamic>, cycle : Cycle) {

  }

  public function removeSystem(system : ISystem<Dynamic>) {

  }

  public function addMultiSystem(system : IMultiSystem<Dynamic>, cycle : Cycle) {

  }

  public function removeMultiSystem(system : IMultiSystem<Dynamic>) {

  }

  public function update() {

  }

  public function render() {

  }
}

enum Cycle {
  render;
  update;
}