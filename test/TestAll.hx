using utest.Assert;
import utest.Runner;
import utest.ui.Report;
using thx.core.Iterators;

import edge.*;

class TestAll {
  public function testEngineComponents2System() {
    var engine = new Engine(),
        s = new Components2System(),
        e = new Entity([new A(), new B()]);
    engine.addSystem(s, Cycle.update);
    Assert.equals(0, s.count);
    engine.update();
    Assert.equals(0, s.count);
    engine.addEntity(e);
    engine.update();
    Assert.equals(1, s.count);
    engine.removeEntity(e);
    engine.update();
    Assert.equals(1, s.count);
    engine.addEntity(e);
    engine.update();
    Assert.equals(2, s.count);
    e.removeType(A);
    engine.update();
    Assert.equals(2, s.count);
  }

  public function testEngineComponents1System() {
    var engine = new Engine(),
        s = new Components1System(),
        e = new Entity([new B()]);
    engine.addSystem(s, Cycle.update);
    Assert.equals(0, s.count);
    engine.update();
    Assert.equals(0, s.count);
    engine.addEntity(e);
    engine.update();
    Assert.equals(1, s.count);
    engine.removeEntity(e);
    engine.update();
    Assert.equals(1, s.count);
    engine.addEntity(e);
    engine.update();
    Assert.equals(2, s.count);
    e.removeType(B);
    engine.update();
    Assert.equals(2, s.count);
  }

  public function testEngineComponents1MissingSystem() {
    var engine = new Engine(),
        s = new Components1System(),
        e = new Entity([new A()]);
    engine.addSystem(s, Cycle.update);
    Assert.equals(0, s.count);
    engine.update();
    Assert.equals(0, s.count);
    engine.addEntity(e);
    engine.update();
    Assert.equals(0, s.count);
    engine.removeEntity(e);
    engine.update();
    Assert.equals(0, s.count);
  }

  public function testEngineNoComponentSystem() {
    var engine = new Engine(),
        s = new NoComponentsSystem();
    engine.addSystem(s, Cycle.update);
    Assert.equals(0, s.count);
    engine.update();
    Assert.equals(1, s.count);
    engine.update();
    Assert.equals(2, s.count);
    engine.removeSystem(s);
    engine.update();
    Assert.equals(2, s.count);
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
    var e = new Entity();
    Assert.isNull(e.engine);
    e.add(new A());
    assertNumberOfComponents(e, 1);
    e.add(new B());
    assertNumberOfComponents(e, 2);
    var a = new A();
    e.add(a);
    assertNumberOfComponents(e, 2);
    e.remove(a);
    assertNumberOfComponents(e, 1);
    e.removeType(B);
    assertNumberOfComponents(e, 0);
  }

  public function assertNumberOfComponents(e : Entity, qt : Int, ?pos : haxe.PosInfos)
    Assert.equals(qt, e.components().toArray().length, pos);

  public function assertNumberOfEntities(e : Engine, qt : Int, ?pos : haxe.PosInfos)
    Assert.equals(qt, e.entities().toArray().length, pos);

  public function assertNumberOfSystems(e : Engine, qt : Int, ?pos : haxe.PosInfos)
    Assert.equals(qt, e.systems().toArray().length, pos);

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

  public function getEntitiesRequirements() return [];
  public function getUpdateRequirements() return null;
}

class Components2System implements ISystem {
  public var count(default, null) = 0;
  public function new() {}

  public function update(b : B, a : A) {
    Assert.is(b, B);
    Assert.is(a, A);
    count++;
  }

  public function getEntitiesRequirements() return null;
  public function getUpdateRequirements() : Array<Class<Dynamic>> return [B, A];
}

class Components1System implements ISystem {
  public var count(default, null) = 0;
  public function new() {}

  public function update(b : B) {
    Assert.is(b, B);
    count++;
  }

  public function getEntitiesRequirements() return null;
  public function getUpdateRequirements() : Array<Class<Dynamic>> return [B];
}

class A {
  public function new(){}
}

class B {
  public function new(){}
}