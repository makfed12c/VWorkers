package edge;

interface ISystemProcess {
  public function update(engine : Engine, delta : Float) : Void;
  public function addEntity(entity : Entity) : Void;
  public function removeEntity(entity : Entity) : Void;
}