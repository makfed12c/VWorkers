package edge;

import edge.core.ISystemProcess;

@:autoBuild(edge.core.macro.BuildSystem.complete())
interface ISystem {
  private var __process__ : ISystemProcess;
}