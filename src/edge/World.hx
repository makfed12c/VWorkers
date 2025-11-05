package edge;

import thx.core.Timer;

class World {
  public var frame(default, null) : Phase;
  public var physics(default, null) : Phase;
  public var render(default, null) : Phase;
  public var engine(default, null) : Engine;
  public var delta(default, null) : Float;

  var schedule : (Float -> Void) -> (Void -> Void);
  var cancel : Void -> Void;
  var remainder : Float;
  public function new(?delta : Float = 16, ?schedule : (Float -> Void) -> (Void -> Void)) {
    engine = new Engine();
    frame  = engine.createPhase();
    physics = engine.createPhase();
    render = engine.createPhase();
    remainder  = 0;
    this.delta = delta;
    this.schedule = null != schedule ? schedule : Timer.frame;
  }

  public function start() {
    if(null != cancel) return;
    cancel = schedule(run);
  }

  function run(t : Float) {
    frame.update();
    t += remainder;
    while(t > delta) {
      t -= delta;
      physics.update();
    }
    remainder = t;
    render.update();
  }

  public function stop() {
    if(null == cancel) return;
    cancel();
    cancel = null;
  }
}