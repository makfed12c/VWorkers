package edge;

/**
`ISystem` implementation requires either;

public function update(a : CompA, b : CompB ...) : Void;

optional fields:
  `entity : Entity` // sets the current entity being updated
  `entities : Array<T>` // array of components objects where each
                        // object contains the fields returned by
                        // `getEntitiesRequirements()` plus an
                        // `entity : Entity` field
TODO
  `delta : Float` // for elapsed time since last update
*/
@:autoBuild(edge.macro.BuildSystem.complete())
interface ISystem {
  private var __systemProcess : ISystemProcess;
//  private function __getSystemProcess(engine : Engine) : ISystemProcess;
//  var componentRequirements(default, null) : Array<Class<Dynamic>>;
//  var entityRequirements(default, null) : Array<{ name : String , cls : Class<Dynamic> }>;
}