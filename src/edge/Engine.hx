package edge;

import edge.Entity;

@:access(edge.Entity)
@:access(edge.ISystem)
class Engine {
  var mapEntities : Map<Entity, Bool>;
  var listPhases : Array<Phase>;
  public function new() {
    mapEntities = new Map();
    listPhases = [];
  }

  public function create(?components : Array<{}>) {
    var entity = new Entity(this, components);
    mapEntities.set(entity, true);
    matchSystems(entity);
    return entity;
  }

  public function clear()
    for(entity in mapEntities.keys())
      remove(entity);

  function remove(entity : Entity) {
    eachSystem(function(system) system.__process__.removeEntity(entity));
    mapEntities.remove(entity);
    entity.engine = null;
  }

  public function entities()
    return mapEntities.keys();

  public function createPhase() {
    var phase = new Phase(this);
    listPhases.push(phase);
    return phase;
  }

  public function phases()
    return listPhases.iterator();

  public function eachSystem(f : ISystem -> Void) {
    for(phase in listPhases)
      for(system in phase.systems())
        f(system);
  }

  // private methods
  function addSystem(system : ISystem) {
    eachSystem(
      function(s)
        if(s == system)
          throw 'System "$system" already exists in Engine');
    for(entity in mapEntities.keys())
      match(entity, system);
  }

  // TODO, remove all together, not one at the time
  function removeSystem(system : ISystem)
    for(entity in mapEntities.keys())
      system.__process__.removeEntity(entity);

  function updateSystem(system : ISystem, t : Float)
    return system.__process__.update(this, t);

  function matchSystems(entity : Entity)
    eachSystem(function(system) match(entity, system));

  inline function match(entity : Entity, system : ISystem)
    system.__process__.addEntity(entity);
}
