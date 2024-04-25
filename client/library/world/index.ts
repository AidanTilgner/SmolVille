import * as B from "babylonjs";
import { setup } from "./worldSrc";
import { SystemManager } from "./building/systems";
import { EntityManager } from "./building/entities";

export interface WorldState {
  frame: number;
}

export interface World {
  engine: B.Engine;
  scene: B.Scene;
  entityManager: EntityManager;
  systemsManager: SystemManager;
  worldState: WorldState;
}

export function getWorld(canvas: HTMLCanvasElement): World {
  const engine = new B.Engine(canvas, false, {
    preserveDrawingBuffer: true,
    stencil: true,
  });
  const scene = new B.Scene(engine);
  scene.clearColor = new B.Color4(0, 0, 0, 0.5);
  const { worldState, entityManager, systemsManager } = setup(scene);

  return {
    engine,
    scene,
    worldState,
    entityManager,
    systemsManager,
  };
}
