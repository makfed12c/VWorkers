package edge;

import edge.Entity;

using thx.core.Arrays;

@:access(edge.Entity)
class World {
  var entities : Map<Entity, Bool>;
  var systemToCycle : Map<ISystem, Cycle>;
  var mapCycles : Map<Cycle, Array<ISystem>>;
  var emptySystems : Map<Cycle, Array<ISystem>>;
  var systemToComponents : Map<ISystem, Map<Entity, Array<Dynamic>>>;

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
    entities = new Map();
  }

  public function addEntity(entity : Entity) {
    entity.world = this;
    entities.set(entity, true);
    matchSystems(entity);
  }

  public function removeEntity(entity : Entity) {
    for(system in systemToComponents.keys())
      systemToComponents.get(system).remove(entity);
    entities.remove(entity);
  }

  public function addSystem(system : ISystem, cycle : Cycle) {
    removeSystem(system);
    systemToCycle.set(system, cycle);
    var updateRequirements = system.getUpdateRequirements();
    if(null != updateRequirements) {
      mapCycles.get(cycle).push(system);
      systemToComponents.set(system, new Map());
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
        updateRequirements = system.getUpdateRequirements(),
    systemToCycle.remove(system);
    if(null != updateRequirements) {
      mapCycles.get(cycle).remove(system);
      systemToComponents.remove(system);
    } else {
      emptySystems.get(cycle).remove(system);
    }
  }

  inline public function preFrame()
    updateCycle(Cycle.preFrame);

  inline public function postFrame()
    updateCycle(Cycle.preFrame);

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

  function updateCycle(cycle : Cycle) {
    for(system in emptySystems.get(cycle)) {
      Reflect.callMethod(system, Reflect.field(system, "update"), []);
    }
    var f;
    for(system in mapCycles.get(cycle)) {
      var systemComponents = systemToComponents.get(system),
      f = Reflect.field(system, "update");
      if(null != f) {
        for(entity in systemComponents.keys()) {
          var components = systemComponents.get(entity);
          if(Reflect.hasField(system, "entity"))
            Reflect.setField(system, "entity", entity);
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

  function matchSystem(entity : Entity, system : ISystem) {
    var match = systemToComponents.get(system);
    match.remove(entity);
    var components = entity.matchRequirements(system.getUpdateRequirements());
    if(null != components)
      match.set(entity, components);
  }
    if(components.length > 0)
      match.set(entity, components);
  }
}

@:enum
abstract Cycle(String) from String to String {
  public var preRender = "preRender";
  public var render = "render";
  public var postRender = "postRender";
  public var preUpdate = "preUpdate";
  public var update = "update";
  public var postUpdate = "postUpdate";
  public var preFrame = "preFrame";
  public var postFrame = "postFrame";
}