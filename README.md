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

