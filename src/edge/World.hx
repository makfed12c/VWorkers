package edge;

import thx.Timer;

class World {
  public var frame(default, null) : Phase;
  public var physics(default, null) : Phase;
  public var render(default, null) : Phase;
  public var engine(default, null) : Engine;
  public var delta(default, null) : Float;
  public var running(default, null) : Bool;

  var schedule : (Float -> Void) -> (Void -> Void);
  var cancel : Void -> Void;
  var remainder : Float;
  public function new(?delta : Float = 16, ?schedule : (Float -> Void) -> (Void -> Void)) {
    engine  = new Engine();
    frame   = engine.createPhase();
    physics = engine.createPhase();
    render  = engine.createPhase();
    remainder = 0;
    running = false;
    this.delta = delta;
    this.schedule = null != schedule ? schedule : Timer.frame;
  }

  public function start() {
    if(running) return;
    running = true;
    cancel = schedule(run);
  }

  function run(t : Float) {
    frame.update(t);
    var dt = t + remainder;
    while(dt > delta) {
      dt -= delta;
      physics.update(delta);
    }
    remainder = dt;
    render.update(t);
  }

  public function stop() {
    if(!running) return;
    running = false;
    cancel();
  }
}
