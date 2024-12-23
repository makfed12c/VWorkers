package edge;

/**
`ISystem` implementation requires either;

public function update(a : CompA, b : CompB ...) : Void;
*/
interface ISystem {
  function getUpdateRequirements() : Array<Class<Dynamic>>;
  function getEntitiesRequirements() : Array<{ name : String , cls : Class<Dynamic> }>;
}