package edge;

import edge.Entity;

@:access(edge.Entity)
@:access(edge.ISystem)
class Engine {
  // TODO remove
  var mapProcess : Map<ISystem, ISystemProcess>;
  var mapEntities : Map<Entity, Bool>;
  var listPhases : Array<Phase>;
  public function new() {
    mapProcess = new Map();
    mapEntities = new Map();
    listPhases = [];
  }

  public function create(?components : Array<{}>) {
    var entity = new Entity(this, components);
    mapEntities.set(entity, true);
    matchSystems(entity);
//    matchEntities(entity);
    return entity;
  }

  public function clear()
    for(entity in mapEntities.keys())
      remove(entity);

  function remove(entity : Entity) {
    for(process in mapProcess)
      process.removeEntity(entity);
//      info.components.remove(entity);
/*
    for(info in mapProcess)
      for(collection in info.process.collections)
        collection.view.remove(entity);
*/
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
  function addSystem(phase : Phase, system : ISystem) {
    if(mapProcess.exists(system))
      throw 'System "$system" already exists in Engine';
//    var process = new SystemInfo(system, system.__systemProcess);
    mapProcess.set(system, system.__systemProcess);
/*
    if(info.process.hasUpdateItems)
      for(entity in mapEntities.keys())
        matchSystem(entity, system);
    if(info.process.collections.iterator().hasNext())
      for(entity in mapEntities.keys())
        matchEntity(entity, system);
*/
    for(entity in mapEntities.keys())
      match(entity, system);
  }

  function removeSystem(system : ISystem)
    mapProcess.remove(system);

  var emptyArgs = [];
  function updateSystem(system : ISystem, t : Float) {
    var process = mapProcess.get(system);
    if(process == null)
      return;
//    var process = info.process;
    process.update(this, t);
//    if(info.hasEngine)
//      Reflect.setField(system, "engine", this);
//    if(info.hasDelta)
//      Reflect.setField(system, "timeDelta", t);
//    process.before();
/*
    if(info.hasComponents) {
//      if(info.hasBefore)
//        Reflect.callMethod(system, info.before, emptyArgs);
      for(entity in info.components.keys()) {
        var components = info.components.get(entity);
        process.setEntity(entity);
//        if(info.hasEntity)
//          Reflect.setField(system, "entity", entity);
        Reflect.callMethod(system, info.update, components);
      }
//    } else {
//      Reflect.callMethod(system, info.update, emptyArgs);
    }
*/
  }

  function matchSystems(entity : Entity)
    eachSystem(function(system) match(entity, system));
//    for(system in systems())
//      match(entity, system);
//    for(system in mapProcess.keys())
//      matchSystem(entity, system);

/*
  function matchEntities(entity : Entity)
    for(system in mapProcess.keys())
      matchEntity(entity, system);
*/
  inline function match(entity : Entity, system : ISystem)
    system.__systemProcess.addEntity(entity);

//  function matchSystem(entity : Entity, system : ISystem) {
//    var info = mapProcess.get(system);
/*
    info.components.remove(entity);
    if(info.hasComponents) {
      var components = matchRequirements(entity, system.componentRequirements);
      if(null != components)
        info.components.set(entity, components);
    }
*/
//    info.process.addEntity(entity);
//  }

//  function matchEntity(entity : Entity, system : ISystem) {
//    var info = mapProcess.get(system);
    /*
    if(!info.process.collections.iterator().hasNext()) return;
    for(name in info.process.collections.keys()) {
      var collection = info.process.collections.get(name);
      collection.view.remove(entity);
      var componentRequirements = collection.classes,
          components = matchRequirements(entity, componentRequirements),
          o;
      if(null != components) {
        o = {};
        for(i in 0...components.length) {
          Reflect.setField(o, collection.fields[i], components[i]);
        }
        Reflect.setField(o, "entity", entity);
        collection.view.add(entity, o);
      }
    }
    */
//    info.process.addEntity(entity);
//  }
/*
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
*/
}