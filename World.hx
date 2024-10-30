package edge;

import edge.Entity;

using thx.core.Arrays;

@:access(edge.Entity)
class World {
  var entities : Map<Entity, Bool>;
  var systemToCycle : Map<ISystem, Cycle>;
  var mapCycles : Map<Cycle, Array<ISystem>>;
  var emptySystems : Map<Cycle, Array<ISystem>>;

  public function new() {
    systemToCycle = new Map();
    mapCycles = new Map();
    emptySystems = new Map();
    [Cycle.update, Cycle.render, Cycle.preRender]
      .map(function(s) {
        emptySystems.set(s, []);
        mapCycles.set(s, []);
      });
    matches = new Map();
    entities = new Map();
  }

  public function addEntity(entity : Entity) {
    entity.world = this;
    entities.set(entity, true);
    matchSystems(entity);
  }

  public function removeEntity(entity : Entity) {
    for(system in matches.keys())
      matches.get(system).remove(entity);
    entities.remove(entity);
  }

  public function addSystem(system : ISystem, cycle : Cycle) {
    removeSystem(system);
    systemToCycle.set(system, cycle);
    var requirements = system.getRequirements();
    if(requirements.length > 0) {
      mapCycles.get(cycle).push(system);
      matches.set(system, new Map());
      for(entity in entities.keys())
        matchSystem(entity, system);
    } else {
      emptySystems.get(cycle).push(system);
    }
  }

  public function removeSystem(system : ISystem) {
    if(!systemToCycle.exists(system))
      return;
    var cycle = systemToCycle.get(system),
        requirements = system.getRequirements();
    systemToCycle.remove(system);
    if(requirements.length > 0) {
      mapCycles.get(cycle).remove(system);
      matches.remove(system);
    } else {
      emptySystems.get(cycle).remove(system);
    }
  }

  public function update()
    updateCycle(Cycle.update);

  public function preRender()
    updateCycle(Cycle.preRender);

  public function render()
    updateCycle(Cycle.render);

  function updateCycle(cycle : Cycle) {
    for(system in emptySystems.get(cycle)) {
      Reflect.callMethod(system, Reflect.field(system, "update"), []);
    }
    var f;
    for(system in mapCycles.get(cycle)) {
      var match = matches.get(system);
      f = Reflect.field(system, "update");
      if(null != f) {
        for(components in match) {
          Reflect.callMethod(system, f, components);
        }
        continue;
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