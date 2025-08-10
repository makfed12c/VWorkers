package edge;

import edge.Entity;

using thx.core.Arrays;
using thx.core.Iterators;

@:access(edge.Entity)
class Engine {
  var mapEntities : Map<Entity, Bool>;
  var systemToCycle : Map<ISystem, Cycle>;
  var mapCycles : Map<Cycle, Array<ISystem>>;
  var emptySystems : Map<Cycle, Array<ISystem>>;
  var systemToComponents : Map<ISystem, Map<Entity, Array<Dynamic>>>;
  var systemToEntities : Map<ISystem, Map<Entity, Dynamic>>;

  var listPhases : Array<Phase>;

  public function new() {
    systemToCycle = new Map();
    mapCycles = new Map();
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

  function addSystem(phase : Phase, system : ISystem) {

  }

  public function pushSystem(system : ISystem, cycle : Cycle) {
    removeSystem(system);
    systemToCycle.set(system, cycle);
    var updateRequirements = system.componentRequirements;
    if(null != updateRequirements && updateRequirements.length > 0) {
      mapCycles.get(cycle).push(system);
      systemToComponents.set(system, new Map());
      for(entity in mapEntities.keys())
        matchSystem(entity, system);
    } else {
      emptySystems.get(cycle).push(system);
    }
    if(null != system.entityRequirements) {
      systemToEntities.set(system, new Map());
      for(entity in mapEntities.keys())
        matchEntity(entity, system);
    }
  }

  public function removeSystem(system : ISystem) {
    if(!systemToCycle.exists(system))
      return;
    var cycle = systemToCycle.get(system),
        updateRequirements = system.componentRequirements;
    systemToCycle.remove(system);
    if(null != updateRequirements) {
      mapCycles.get(cycle).remove(system);
      systemToComponents.remove(system);
    } else {
      emptySystems.get(cycle).remove(system);
    }
    if(null != system.entityRequirements) {
      systemToEntities.remove(system);
    }
  }

  public function systems()
    return systemToCycle.keys();

  inline public function preFrame()
    updateCycle(Cycle.preFrame);

  inline public function postFrame()
    updateCycle(Cycle.postFrame);

  inline public function preUpdate()
    updateCycle(Cycle.preUpdate);

  inline public function update()
    updateCycle(Cycle.update);

  inline public function postUpdate()
    updateCycle(Cycle.postUpdate);

  inline public function preRender()
    updateCycle(Cycle.preRender);

  inline public function render()
    updateCycle(Cycle.render);

  inline public function postRender()
    updateCycle(Cycle.postRender);

  // private methods
  function updateCycle(cycle : Cycle) {
    for(system in emptySystems.get(cycle)) {
      Reflect.callMethod(system, Reflect.field(system, "update"), []);
    }
    var f;
    for(system in mapCycles.get(cycle)) {
      var systemComponents = systemToComponents.get(system),
          systemEntities = systemToEntities.get(system);
      f = Reflect.field(system, "update");
      if(null != f) {
        for(entity in systemComponents.keys()) {
          var components = systemComponents.get(entity);
          if(Reflect.hasField(system, "entity"))
            Reflect.setField(system, "entity", entity);
          if(null != systemEntities) {
            var arr = systemEntities.iterator().toArray();
            Reflect.setField(system, "entities", arr);
          }
          Reflect.callMethod(system, f, components);
        }
        continue;
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
