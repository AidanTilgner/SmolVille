import {
  PositionComponent,
  RenderComponent,
  VelocityComponent,
} from "./components";
import { EntityManager } from "./entities";
import * as B from "babylonjs";

export interface ISystem {
  update(deltaTime: number): void;
}

export class SystemManager {
  private systems: ISystem[];

  constructor() {
    this.systems = [];
  }

  registerSystem(system: ISystem) {
    this.systems.push(system);
  }

  updateAll(deltaTime: number) {
    this.systems.forEach((s) => {
      s.update(deltaTime);
    });
  }
}

export class MovementSystem implements ISystem {
  private entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  update(deltaTime: number): void {
    this.entityManager.getAllEntities().forEach((entity) => {
      if (entity.hasComponent("position") && entity.hasComponent("velocity")) {
        const p = entity.getComponent<PositionComponent>("position")!;
        const v = entity.getComponent<VelocityComponent>("velocity")!;

        const { x, y, z } = p.getPosition();
        const { vx, vy, vz } = v.getVelocity();

        p.setPosition({
          x: x * (vx * deltaTime),
          y: y * (vy * deltaTime),
          z: z * (vz * deltaTime),
        });
      }
    });
  }
}

export class RenderSystem implements ISystem {
  private entityManager: EntityManager;
  private scene: B.Scene;

  constructor(entityManager: EntityManager, scene: B.Scene) {
    this.entityManager = entityManager;
    this.scene = scene;
  }

  update(deltaTime: number): void {
    this.entityManager.getAllEntities().forEach((entity) => {
      if (entity.hasComponent("render")) {
        const r = entity.getComponent<RenderComponent>("render");
        r.render(this.scene);
      }
    });
  }
}
