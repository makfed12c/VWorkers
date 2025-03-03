package edge;

@:enum
abstract Cycle(String) from String to String {
  public var preRender = "preRender";
  public var render = "render";
  public var postRender = "postRender";
  public var preUpdate = "preUpdate";
  public var update = "update";
  public var postUpdate = "postUpdate";
  public var preFrame = "preFrame";
  public var postFrame = "postFrame";
}