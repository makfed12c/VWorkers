package edge.core;

interface ISystemProcess {
  public function update(engine : Engine, delta : Float) : Bool;
  public function addEntity(entity : Entity) : Void;
  public function removeEntity(entity : Entity) : Void;
}
