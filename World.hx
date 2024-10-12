package edge;

import edge.Entity;

using thx.core.Arrays;

@:access(edge.Entity)
class World {
  var entities : Map<Entity, Bool>;
  var systemToCycle : Map<ISystem, Cycle>;
  var mapCycles : Map<String, Array<ISystem>>;

  public function new() {
    systemToCycle = new Map();
    mapCycles = new Map();
    [Cycle.update, Cycle.render, Cycle.preRender].pluck(mapCycles.set(_, []));
    matches = new Map();
    entities = new Map();
  }

  public function addEntity(entity : Entity) {
    entity.world = this;
    entities.set(entity, true);
    matchSystems(entity);
  }

  public function removeEntity(entity : Entity) {
    for(system in matches.keys()) {
      matches.get(system).remove(entity);
    }
    entities.remove(entity);
  }

  public function addSystem(system : ISystem, cycle : Cycle) {
    removeSystem(system);
    systemToCycle.set(system, cycle);
    mapCycles.get(cycle).push(system);
    matches.set(system, new Map());
    for(entity in entities.keys())
      matchSystem(entity, system);
  }

  public function removeSystem(system : ISystem) {
    if(!systemToCycle.exists(system))
      return;
    var cycle = systemToCycle.get(system);
    systemToCycle.remove(system);
    mapCycles.get(cycle).remove(system);
    matches.remove(system);
  }

  public function update()
    updateCycle(Cycle.update);

  public function preRender()
    updateCycle(Cycle.preRender);

  public function render()
    updateCycle(Cycle.render);

  function updateCycle(cycle : Cycle) {
    var systems = mapCycles.get(cycle),
        f;
    for(system in systems) {
      var match = matches.get(system);
      f = Reflect.field(system, "update");
      if(null != f) {
        for(components in match) {
          Reflect.callMethod(system, f, components);
        }
        break;
      }
      f = Reflect.field(system, "updateAll");
      if(null != f) {
        var list = [];
        for(components in match) {
          list.push(components);
        }
        Reflect.callMethod(system, f, [list]);
      }
    }
  }

  var matches : Map<ISystem, Map<Entity, Array<Dynamic>>>;
  function matchSystems(entity : Entity) {
    for(system in matches.keys()) {
      matchSystem(entity, system);
    }
  }

  function matchSystem(entity : Entity, system : ISystem) {
    var match = matches.get(system);
    match.remove(entity);
    var components = entity.matchRequirements(system.getRequirements());
    if(components.length > 0)
      match.set(entity, components);
  }
}

@:enum
abstract Cycle(String) from String to String {
  public var preRender = "preRender";
  public var render = "render";
  public var update = "update";
}