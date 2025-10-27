package edge;

import edge.Entity;

using thx.core.Arrays;
using thx.core.Iterators;

@:access(edge.Entity)
class Engine {
  var mapInfo : Map<ISystem, SystemInfo>;
  var mapEntities : Map<Entity, Bool>;
  var systemToEntities : Map<ISystem, Map<Entity, Dynamic>>;
  var listPhases : Array<Phase>;

  public function new() {
    mapInfo = new Map();
    mapEntities = new Map();
    systemToEntities = new Map();
    listPhases = [];
  }

  public function addEntity(entity : Entity) {
    entity.engine = this;
    mapEntities.set(entity, true);
    matchSystems(entity);
    matchEntities(entity);
  }

  public function removeEntity(entity : Entity) {
    for(system in mapInfo.keys())
      mapInfo.get(system).components.remove(entity);
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
    var info = {
          hasComponents : null != system.componentRequirements && system.componentRequirements.length > 0,
          hasEntity : Reflect.hasField(system, "entity"),
          hasEntities : null != system.entityRequirements,
          update : Reflect.field(system, "update"),
          phase : phase,
          components : new Map()
        };
    mapInfo.set(system, info);
    if(info.hasComponents) {
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
    if(!mapInfo.exists(system))
      return;
    var info = mapInfo.get(system);
    mapInfo.remove(system);
    if(info.hasEntities) {
      systemToEntities.remove(system);
    }
  }

  function updateSystem(system : ISystem) {
    var info = mapInfo.get(system);
    if(!info.hasComponents) {
      Reflect.callMethod(system, info.update, []);
    } else {
      for(entity in info.components.keys()) {
        var components = info.components.get(entity);
        if(info.hasEntity)
          Reflect.setField(system, "entity", entity);
        if(info.hasEntities)
          Reflect.setField(system, "entities", systemToEntities.get(system).iterator().toArray());
        Reflect.callMethod(system, info.update, components);
      }
    }
  }

  function matchSystems(entity : Entity) {
    for(system in mapInfo.keys()) {
      matchSystem(entity, system);
    }
  }

  function matchEntities(entity : Entity) {
    for(system in systemToEntities.keys()) {
      matchEntity(entity, system);
    }
  }

  function matchSystem(entity : Entity, system : ISystem) {
    var info = mapInfo.get(system);
    info.components.remove(entity);
    if(info.hasComponents) {
      var components = matchRequirements(entity, system.componentRequirements);
      if(null != components)
        info.components.set(entity, components);
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
  update : Dynamic,
  phase : Phase,
  components : Map<Entity, Array<Dynamic>>
}
