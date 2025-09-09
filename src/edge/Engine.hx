package edge;

import edge.Entity;

using thx.core.Arrays;
using thx.core.Iterators;

@:access(edge.Entity)
class Engine {
  var mapSystemToPhase : Map<ISystem, Phase>;
  var mapInfo : Map<ISystem, SystemInfo>;
  var mapEntities : Map<Entity, Bool>;
  var systemToCycle : Map<ISystem, Cycle>;
  var mapCycles : Map<Cycle, Array<ISystem>>;
  var emptySystems : Map<Cycle, Array<ISystem>>;
  var systemToComponents : Map<ISystem, Map<Entity, Array<Dynamic>>>;
  var systemToEntities : Map<ISystem, Map<Entity, Dynamic>>;

  var listPhases : Array<Phase>;

  public function new() {
    systemToCycle = new Map();
    mapInfo = new Map();
    mapCycles = new Map();
    mapSystemToPhase = new Map();
    emptySystems = new Map();
    [
      Cycle.preFrame,  Cycle.postFrame,
      Cycle.preUpdate, Cycle.update, Cycle.postUpdate,
      Cycle.preRender, Cycle.render, Cycle.postRender
    ].map(function(s) {
        emptySystems.set(s, []);
        mapCycles.set(s, []);
      });
    systemToComponents = new Map();
    systemToEntities = new Map();
    mapEntities = new Map();
    listPhases = [];
  }

  public function addEntity(entity : Entity) {
    entity.engine = this;
    mapEntities.set(entity, true);
    matchSystems(entity);
    matchEntities(entity);
  }

  public function removeEntity(entity : Entity) {
    for(system in systemToComponents.keys())
      systemToComponents.get(system).remove(entity);
    for(system in systemToEntities.keys())
      systemToEntities.get(system).remove(entity);
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

  // TODO, extract from map instead that from Phases
  public function systems() : Array<ISystem>
    return listPhases.pluck(_.systems().toArray()).flatten();

  // private methods
  function addSystem(phase : Phase, system : ISystem) {
    mapSystemToPhase.set(system, phase);
    var updateRequirements = system.componentRequirements,
        info = {
          hasComponents : null != updateRequirements && updateRequirements.length > 0,
          hasEntity : Reflect.hasField(system, "entity"),
          hasEntities : null != system.entityRequirements,
          update : Reflect.field(system, "update")
        };
    mapInfo.set(system, info);
    if(info.hasComponents) {
      systemToComponents.set(system, new Map());
      for(entity in mapEntities.keys())
        matchSystem(entity, system);
    }
    if(info.hasEntities) {
      systemToEntities.set(system, new Map());
      for(entity in mapEntities.keys())
        matchEntity(entity, system);
    }
  }

  function removeSystem(system : ISystem) {
    if(!mapSystemToPhase.exists(system))
      return;
    mapSystemToPhase.remove(system);
    var info = mapInfo.get(system);
    if(info.hasComponents) {
      systemToComponents.remove(system);
    }
    if(info.hasEntities) {
      systemToEntities.remove(system);
    }
  }

  function updateSystem(system : ISystem) {
    var info = mapInfo.get(system);
    if(!info.hasComponents) {
      Reflect.callMethod(system, info.update, []);
    } else {
      var systemComponents = systemToComponents.get(system);
      for(entity in systemComponents.keys()) {
        var components = systemComponents.get(entity);
        if(info.hasEntity)
          Reflect.setField(system, "entity", entity);
        if(info.hasEntities)
          Reflect.setField(system, "entities", systemToEntities.get(system).iterator().toArray());
        Reflect.callMethod(system, info.update, components);
      }
    }
  }

  function matchSystems(entity : Entity) {
    for(system in systemToComponents.keys()) {
      matchSystem(entity, system);
    }
  }

  function matchEntities(entity : Entity) {
    for(system in systemToEntities.keys()) {
      matchEntity(entity, system);
    }
  }

  function matchSystem(entity : Entity, system : ISystem) {
    var match = systemToComponents.get(system);
    match.remove(entity);
    if(system.componentRequirements == null || system.componentRequirements.length == 0) {
      match.set(entity, []);
    } else {
      var components = matchRequirements(entity, system.componentRequirements);
      if(null != components)
        match.set(entity, components);
    }
  }

  function matchEntity(entity : Entity, system : ISystem) {
    var match = systemToEntities.get(system),
        componentRequirements = system.entityRequirements.map(function(o) return o.cls);
    match.remove(entity);
    var components = matchRequirements(entity, componentRequirements);
    if(null != components) {
      var o = {};
      for(i in 0...components.length) {
        Reflect.setField(o, system.entityRequirements[i].name, components[i]);
      }
      Reflect.setField(o, "entity", entity);
      match.set(entity, o);
    }
  }

  function matchRequirements(entity : Entity, requirements : Array<Class<Dynamic>>) {
    var comps = [];
    for(req in requirements) {
      for(component in entity.components()) {
        if(Type.getClass(component) == req) {
          comps.push(component);
          break;
        }
      }
    }
    return comps.length == requirements.length ? comps : null;
  }
}

typedef SystemInfo = {
  hasComponents : Bool,
  hasEntity : Bool,
  hasEntities : Bool,
  update : Dynamic
}
