package edge;

/**
`ISystem` implementation requires either;

public function update(a : CompA, b : CompB ...) : Void;

// this needs to be reviewed:
public function updateAll(list : Array<Array<Dynamic>>) : Void;
*/
interface ISystem {
  function getRequirements() : Array<Class<Dynamic>>;
}