# edge

Entity system for Haxe

## introduction

*edge* works on the following principles:

  * an `Entity` is a collection of components with no additional logic.
  * a `Component` is an instance of any type of Class. You can use anything as a component except for anonymous objects and primitive types.
  * a `Component` is a data object with no logic. If you want to put some logic in them, do it at your own risk. You have been warned.
  * a `System` manages a portion of the application logic and it is responsible for reading and writing from and to the components as needed.
  * A `System` is required to have at least the `update()` method defined. Update can take zero or more arguments. Arguments types should only be components.
  * the `Engine` manages the entities, their pairing with the systems and the application phases.
  * a `Phase` is a collection of systems that need to be processed sometime in the future.
  * when a `Phase` is updated, `Engine` invokes the `update()` method of each `System` included in `Phase`. Only systems that are paired with at least one entity will be triggered, and once for each entity that matches `update`. A System whose `update` method has no arguments will be invoked on each update once.
  * `World` is a general case implementation to add a scheduler based on the concept of frame with the `rendering` and `physics` phases. If you plan to do sophisticated things with your loops/phases, you might consider writing an alternative implementation of `World`.

## example

In the example below we create a bunch of entities some with both `Position` and `Velocity` and some with only `Position`. The system `UpdateMovement` will only affect the entities with both components, while `RenderingDots` will be applied to all the entities in this context.

`RenderingBackground` will clear the canvas on every frame before any other rendering operation. Note that it will only be invoked once per frame and it doesn't rely on the presence of any entity (`update()` takes no argument).

```haxe
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
      world.engine.add(new Entity([
          new Position(
            Math.random() * width,
            Math.random() * height),
          new Velocity(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1)
        ]));

    for(i in 0...20)
      world.engine.add(new Entity([
          new Position(
            Math.random() * width,
            Math.random() * height)
        ]));

    world.physics.add(new UpdateMovement());

    world.render.add(new RenderBackground(mini));
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

  function update(pos : Position)
    mini.dot(pos.x, pos.y, 2, 0x000000FF);
}

class RenderBackground implements ISystem {
  var mini : MiniCanvas;
  public function new(mini : MiniCanvas)
    this.mini = mini;

  function update()
    mini.clear();
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
```
