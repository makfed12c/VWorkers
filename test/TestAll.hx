using utest.Assert;
import utest.Runner;
import utest.ui.Report;
using thx.core.Iterators;

import edge.*;

class TestAll {
  public function testEngineComponents2System() {
    var engine = new Engine(),
        system = new Components2System(),
        entity = new Entity([new A(), new B()]);
    engine.addSystem(system, Cycle.update);
    Assert.equals(0, system.count);
    engine.update();
    Assert.equals(0, system.count);
    Assert.isNull(entity.engine);
    engine.addEntity(entity);
    Assert.equals(engine, entity.engine);
    engine.update();
    Assert.equals(1, system.count);
    engine.removeEntity(entity);
    Assert.isNull(entity.engine);
    engine.update();
    Assert.equals(1, system.count);
    engine.addEntity(entity);
    engine.update();
    Assert.equals(2, system.count);
    entity.removeType(A);
    engine.update();
    Assert.equals(2, system.count);
  }

  public function testEngineComponents1System() {
    var engine = new Engine(),
        system = new Components1System(),
        entity = new Entity([new B()]);
    engine.addSystem(system, Cycle.update);
    Assert.equals(0, system.count);
    engine.update();
    Assert.equals(0, system.count);
    engine.addEntity(entity);
    engine.update();
    Assert.equals(1, system.count);
    engine.removeEntity(entity);
    engine.update();
    Assert.equals(1, system.count);
    engine.addEntity(entity);
    engine.update();
    Assert.equals(2, system.count);
    entity.removeType(B);
    engine.update();
    Assert.equals(2, system.count);
  }

  public function testEngineComponents1MissingSystem() {
    var engine = new Engine(),
        system = new Components1System(),
        entity = new Entity([new A()]);
    engine.addSystem(system, Cycle.update);
    Assert.equals(0, system.count);
    engine.update();
    Assert.equals(0, system.count);
    engine.addEntity(entity);
    engine.update();
    Assert.equals(0, system.count);
    engine.removeEntity(entity);
    engine.update();
    Assert.equals(0, system.count);
  }

  public function testEngineNoComponentSystem() {
    var engine = new Engine(),
        system = new NoComponentsSystem();
    engine.addSystem(system, Cycle.update);
    Assert.equals(0, system.count);
    engine.update();
    Assert.equals(1, system.count);
    engine.update();
    Assert.equals(2, system.count);
    engine.removeSystem(system);
    engine.update();
    Assert.equals(2, system.count);
  }

  public function testEngineSystemCounting() {
    var engine = new Engine(),
        s1 = new NoComponentsSystem(),
        s2 = new Components2System();
    assertNumberOfEntities(engine, 0);
    assertNumberOfSystems(engine, 0);
    engine.addSystem(s1, Cycle.update);
    assertNumberOfSystems(engine, 1);
    engine.addSystem(s2, Cycle.update);
    assertNumberOfSystems(engine, 2);
    engine.removeSystem(s1);
    assertNumberOfSystems(engine, 1);
    engine.removeSystem(s1);
    assertNumberOfSystems(engine, 1);
    engine.removeSystem(s2);
    assertNumberOfSystems(engine, 0);
  }

  public function testEngineEntity() {
    var engine = new Engine(),
        e1 = new Entity(),
        e2 = new Entity();
    assertNumberOfEntities(engine, 0);
    assertNumberOfSystems(engine, 0);
    engine.addEntity(e1);
    assertNumberOfEntities(engine, 1);
    assertNumberOfSystems(engine, 0);
    engine.addEntity(e2);
    assertNumberOfEntities(engine, 2);
    engine.removeEntity(e1);
    assertNumberOfEntities(engine, 1);
    engine.removeEntity(e1);
    assertNumberOfEntities(engine, 1);
    engine.removeEntity(e2);
    assertNumberOfEntities(engine, 0);
  }

  public function testEntity() {
    var entity = new Entity();
    Assert.isNull(entity.engine);
    entity.add(new A());
    assertNumberOfComponents(entity, 1);
    entity.add(new B());
    assertNumberOfComponents(entity, 2);
    var a = new A();
    entity.add(a);
    assertNumberOfComponents(entity, 2);
    entity.remove(a);
    assertNumberOfComponents(entity, 1);
    entity.removeType(B);
    assertNumberOfComponents(entity, 0);
  }

  public function assertNumberOfComponents(entity : Entity, qt : Int, ?pos : haxe.PosInfos)
    Assert.equals(qt, entity.components().toArray().length, pos);

  public function assertNumberOfEntities(engine : Engine, qt : Int, ?pos : haxe.PosInfos)
    Assert.equals(qt, engine.entities().toArray().length, pos);

  public function assertNumberOfSystems(engine : Engine, qt : Int, ?pos : haxe.PosInfos)
    Assert.equals(qt, engine.systems().toArray().length, pos);

  public static function main() {
    var runner = new Runner();

    runner.addCase(new TestAll());

    Report.create(runner);
    runner.run();
  }

  public function new() {}
}

class NoComponentsSystem implements ISystem {
  public var count(default, null) = 0;
  public function new() {}

  public function update() {
    count++;
  }

  public var componentRequirements(default, null) = null;
  public var entitiesRequirements(default, null) = null;
}

class Components2System implements ISystem {
  public var count(default, null) = 0;
  public function new() {}

  public function update(b : B, a : A) {
    Assert.is(b, B);
    Assert.is(a, A);
    count++;
  }

  public var componentRequirements(default, null) : Array<Class<Dynamic>> = [B, A];
  public var entitiesRequirements(default, null) = null;
}

class Components1System implements ISystem {
  public var count(default, null) = 0;
  public function new() {}

  public function update(b : B) {
    Assert.is(b, B);
    count++;
  }

  public var componentRequirements(default, null) : Array<Class<Dynamic>> = [B];
  public var entitiesRequirements(default, null) = null;
}

class A {
  public function new(){}
}

class B {
  public function new(){}
}