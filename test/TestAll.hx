using utest.Assert;
import utest.Runner;
import utest.ui.Report;
using thx.core.Iterators;

import edge.*;

class TestAll {
  public function testEntity() {
    var e = new Entity();
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

  public static function main() {
    var runner = new Runner();

    runner.addCase(new TestAll());

    Report.create(runner);
    runner.run();
  }

  public function new() {}
}

class A {
  public function new(){}
}

class B {
  public function new(){}
}