import { EntityManager } from "../building/entities";
import {
  MovementSystem,
  RenderSystem,
  SystemManager,
} from "../building/systems";
import { WorldState } from "..";
import * as B from "babylonjs";
import { environmentEntities } from "./environment";
import { characterEntities } from "./characters";

export const setup = (scene: B.Scene, canvas: HTMLCanvasElement) => {
  const entityManager = new EntityManager();
  const worldState: WorldState = {
    frame: 0,
  };
  const allEntities = [...environmentEntities, ...characterEntities];
  allEntities.forEach((e) => {
    e(entityManager, worldState, canvas);
  });

  const systemsManager = new SystemManager();
  systemsManager.registerSystem(new MovementSystem(entityManager));
  systemsManager.registerSystem(new RenderSystem(entityManager, scene));

  return {
    entityManager,
    worldState,
    systemsManager,
  };
};
