package edge;

interface ISystemProcess {
//  public function before() : Void;
  public var hasUpdateItems : Bool;

  public function update(engine : Engine, delta : Float) : Void;

  public function addEntity(entity : Entity) : Void;
  public function removeEntity(entity : Entity) : Void;

// TODO remove
//  public function setEntity(entity : Entity) : Void
//  public var collections : Map<String, ViewInfo>;
}