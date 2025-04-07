using utest.Assert;
import utest.Runner;
import utest.ui.Report;
using thx.core.Iterators;

import edge.*;

class TestAll {
  public function testWorldNoComponentSystem() {
    var world = new World(),
        s = new NoComponentsSystem();
    world.addSystem(s, Cycle.update);
    Assert.equals(0, s.count);
    world.update();
    Assert.equals(1, s.count);
    world.update();
    Assert.equals(2, s.count);
    world.removeSystem(s);
    world.update();
    Assert.equals(2, s.count);
  }

  public function testWorldSystemCounting() {
    var world = new World(),
        s1 = new NoComponentsSystem(),
        s2 = new Components2System();
    assertNumberOfEntities(world, 0);
    assertNumberOfSystems(world, 0);
    world.addSystem(s1, Cycle.update);
    assertNumberOfSystems(world, 1);
    world.addSystem(s2, Cycle.update);
    assertNumberOfSystems(world, 2);
    world.removeSystem(s1);
    assertNumberOfSystems(world, 1);
    world.removeSystem(s1);
    assertNumberOfSystems(world, 1);
    world.removeSystem(s2);
    assertNumberOfSystems(world, 0);
  }

  public function testWorldEntity() {
    var world = new World(),
        e1 = new Entity(),
        e2 = new Entity();
    assertNumberOfEntities(world, 0);
    assertNumberOfSystems(world, 0);
    world.addEntity(e1);
    assertNumberOfEntities(world, 1);
    assertNumberOfSystems(world, 0);
    world.addEntity(e2);
    assertNumberOfEntities(world, 2);
    world.removeEntity(e1);
    assertNumberOfEntities(world, 1);
    world.removeEntity(e1);
    assertNumberOfEntities(world, 1);
    world.removeEntity(e2);
    assertNumberOfEntities(world, 0);
  }

  public function testEntity() {
    var e = new Entity();
    Assert.isNull(e.world);
    e.addComponent(new A());
    assertNumberOfComponents(e, 1);
    e.addComponent(new B());
    assertNumberOfComponents(e, 2);
    var a = new A();
    e.addComponent(a);
    assertNumberOfComponents(e, 2);
    e.removeComponent(a);
    assertNumberOfComponents(e, 1);
    e.removeType(B);
    assertNumberOfComponents(e, 0);
  }

  public function assertNumberOfComponents(e : Entity, qt : Int, ?pos : haxe.PosInfos)
    Assert.equals(qt, e.iterator().toArray().length, pos);

  public function assertNumberOfEntities(w : World, qt : Int, ?pos : haxe.PosInfos)
    Assert.equals(qt, w.entities().toArray().length, pos);

  public function assertNumberOfSystems(w : World, qt : Int, ?pos : haxe.PosInfos)
    Assert.equals(qt, w.systems().toArray().length, pos);

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