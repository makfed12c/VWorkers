package edge;

typedef SystemInfo = {
  hasComponents : Bool,
  hasDelta : Bool,
  hasEngine : Bool,
  hasEntity : Bool,
  hasEntities : Bool,
  hasBefore : Bool,
  before : Dynamic,
  update : Dynamic,
  phase : Phase,
  components : Map<Entity, Array<Dynamic>>,
  entities : View<Dynamic>/*,
  views : Map<String, {
    requirements : Void -> Array<Class<Dynamic>>,
    view : View<Dynamic>
  }
  */
}