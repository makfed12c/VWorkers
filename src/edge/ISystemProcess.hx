package edge;

interface ISystemProcess {
  public function before() : Void;
  public function update(engine : Engine, delta : Float) : Void;
  public function setEntity(entity : Entity) : Void;
}