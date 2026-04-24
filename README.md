# edge

Entity system for Haxe

## introduction

*edge* works on the following principles:

  * an `Entity` is a collection of components with no additional logic
  * a `Component` is an instance of any type of Class. You can use anything as a component except for anonymous objects and primitive types. `Enums` are not supported at the moment but might be added in the future.
  * a `Component` is a data object with no logic. Violate this rule at your own risk.
  * `System`s manage all the logic and read from/write to the components as needed.
  * A `System` is required to have at least the `update()` method defined. Update can take zero or more arguments. Arguments should be only the types of the components.
  * the `Engine` manages the entities, their pairing with systems and the update phases.
  * a `Phase` is a collection of systems that need to be processed at sometime in the future.
  * `Engine` invokes the `update()` method of each `System` that is paired with at least one entity. Systems that have the `update` method with no arguments will be invoked on each update once.
  * `World` is a general case implementation to add a scheduler based on the concept of frame with the `rendering` and `physics` phases. If you plan to do sophisticated things with your loops you might consider writing an alternative implementation of `World`.