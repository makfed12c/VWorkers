import edge.*;
import minicanvas.MiniCanvas;

class Game {
  public static var width(default, null) = 200;
  public static var height(default, null) = 200;

  public static function main() {
    var mini = MiniCanvas.create(width, height)
                 .display("basic example"),
        world = new World();

    for(i in 0...300)
      world.engine.create([
          new Position(
            Math.random() * width,
            Math.random() * height),
          new Velocity(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1)
        ]);

    for(i in 0...20)
      world.engine.create([
          new Position(
            Math.random() * width,
            Math.random() * height)
        ]);

    world.physics.add(new UpdateMovement());

    world.render.add(new RenderDots(mini));

    world.start();
  }
}

class Position implements IComponent {
  var x : Float;
  var y : Float;
}

class Velocity implements IComponent {
  var vx : Float;
  var vy : Float;
}

class RenderDots implements ISystem {
  var mini : MiniCanvas;
  public function new(mini : MiniCanvas)
    this.mini = mini;

  public function before()
    mini.clear();

  function update(pos : Position)
    mini.dot(pos.x, pos.y, 2, 0x000000FF);
}

class UpdateMovement implements ISystem {
  function update(pos : Position, vel : Velocity) {
    var dx = pos.x + vel.vx,
        dy = pos.y + vel.vy;
    if(dx <= 0 && vel.vx < 0 || dx >= Game.width && vel.vx > 0)
      vel.vx = -vel.vx;
    else
      pos.x = dx;
    if(dy <= 0 && vel.vy < 0 || dy >= Game.height && vel.vy > 0)
      vel.vy = -vel.vy;
    else
      pos.y = dy;
  }
}