package edge;

import edge.Entity;

using thx.core.Arrays;
using thx.core.Iterators;

@:access(edge.Entity)
class Engine {
  var mapInfo : Map<ISystem, SystemInfo>;
  var mapEntities : Map<Entity, Bool>;
  var listPhases : Array<Phase>;

  public function new() {
    mapInfo = new Map();
    mapEntities = new Map();
    listPhases = [];
  }

  public function add(entity : Entity) {
    entity.engine = this;
    mapEntities.set(entity, true);
    matchSystems(entity);
    matchEntities(entity);
  }

  public function clear()
    for(entity in mapEntities.keys())
      remove(entity);

  public function remove(entity : Entity) {
    for(system in mapInfo.keys())
      mapInfo.get(system).components.remove(entity);
    for(system in mapInfo.keys())
      mapInfo.get(system).entities.remove(entity);
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

  public function systems() : Iterator<ISystem>
    return mapInfo.keys();

  static function hasField(o : {}, field : String)
    return Type.getInstanceFields(Type.getClass(o)).contains(field);

  // private methods
  function addSystem(phase : Phase, system : ISystem) {
    if(mapInfo.exists(system))
      throw 'System "$system" already exists in Engine';
    var info = {
          hasComponents : null != system.componentRequirements && system.componentRequirements.length > 0,
          hasDelta  : hasField(system, "timeDelta"),
          hasEngine : hasField(system, "engine"),
          hasEntity : hasField(system, "entity"),
          hasBefore : hasField(system, "before"),
          hasEntities : null != system.entityRequirements,
          update : Reflect.field(system, "update"),
          phase : phase,
          before : null,
          components : new Map(),
          entities : new Map()
        };
    if(info.hasBefore)
      info.before = Reflect.field(system, "before");
    mapInfo.set(system, info);
    if(info.hasComponents)
      for(entity in mapEntities.keys())
        matchSystem(entity, system);
    if(info.hasEntities)
      for(entity in mapEntities.keys())
        matchEntity(entity, system);
  }

  function removeSystem(system : ISystem)
    mapInfo.remove(system);

  var emptyArgs = [];
  function updateSystem(system : ISystem, t : Float) {
    var info = mapInfo.get(system);
    if(info == null)
      return;
    if(info.hasEngine)
      Reflect.setField(system, "engine", this);
    if(info.hasDelta)
      Reflect.setField(system, "timeDelta", t);
    if(!info.hasComponents) {
      Reflect.callMethod(system, info.update, emptyArgs);
    } else {
      if(info.hasEntities)
        Reflect.setField(system, "entities", info.entities.iterator());
      if(info.hasBefore)
        Reflect.callMethod(system, info.update, emptyArgs);
      for(entity in info.components.keys()) {
        var components = info.components.get(entity);
        if(info.hasEntity)
          Reflect.setField(system, "entity", entity);
        Reflect.callMethod(system, info.update, components);
      }
    }
  }

  function matchSystems(entity : Entity)
    for(system in mapInfo.keys())
      matchSystem(entity, system);

  function matchEntities(entity : Entity)
    for(system in mapInfo.keys())
      matchEntity(entity, system);

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
    var info = mapInfo.get(system);
    if(!info.hasEntities) return;
    info.entities.remove(entity);
    var componentRequirements = system.entityRequirements.map(function(o) return o.cls),
        components = matchRequirements(entity, componentRequirements),
        o;
    if(null != components) {
      o = {};
      for(i in 0...components.length) {
        Reflect.setField(o, system.entityRequirements[i].name, components[i]);
      }
      Reflect.setField(o, "entity", entity);
      info.entities.set(entity, o);
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
  hasDelta : Bool,
  hasEngine : Bool,
  hasEntity : Bool,
  hasEntities : Bool,
  hasBefore : Bool,
  before : Dynamic,
  update : Dynamic,
  phase : Phase,
  components : Map<Entity, Array<Dynamic>>,
  entities : Map<Entity, Dynamic>
}
