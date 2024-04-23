import { EntityManager } from "./entities/entities";
import * as B from "babylonjs";
import { setup } from "./setup";
import { SystemManager } from "./entities/systems";

export interface WorldState {
  frame: number;
}

export interface World {
  engine: B.Engine;
  scene: B.Scene;
  entities: Function[];
  systemsManager: SystemManager;
}

export function getWorld(canvas: HTMLCanvasElement): World {
  const engine = new B.Engine(canvas, false, {
    preserveDrawingBuffer: true,
    stencil: true,
  });
  const scene = new B.Scene(engine);
  const { entities, systemsManager } = setup(scene);

  return {
    engine,
    scene,
    entities,
    systemsManager,
  };
}
