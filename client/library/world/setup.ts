import {
  MaterialComponent,
  MeshComponent,
  PositionComponent,
} from "./entities/components";
import { Entity, EntityManager } from "./entities/entities";
import {
  MovementSystem,
  RenderSystem,
  SystemManager,
} from "./entities/systems";
import { WorldState } from "./world";
import * as B from "babylonjs";

export const entityManager = new EntityManager();
const worldState: WorldState = {
  frame: 0,
};

const GroundEntity = () => {
  const ground = entityManager.createEntity();
  const position = new PositionComponent(
    entityManager,
    ground.getId(),
    {
      x: 0,
      y: 0,
      z: 0,
    },
    worldState
  );
  ground.addComponent(position);

  const mesh = new MeshComponent(
    entityManager,
    ground.getId(),
    {
      mesh: B.MeshBuilder.CreateGround("ground1", {
        width: 100,
        height: 2,
        subdivisions: 10,
        updatable: false,
      }),
    },
    worldState
  );
  ground.addComponent(mesh);

  const material = new MaterialComponent(
    entityManager,
    ground.getId(),
    {
      material: new B.StandardMaterial("groundMaterial1"),
    },
    worldState
  );
  material.getMaterial<B.StandardMaterial>().diffuseColor = new B.Color3(
    128 / 255,
    128 / 255,
    128 / 255
  );
};

export const entities = [GroundEntity];

export const setup = (scene: B.Scene) => {
  entities.forEach((e) => {
    e();
  });

  const systemsManager = new SystemManager();
  systemsManager.registerSystem(new MovementSystem(entityManager));
  systemsManager.registerSystem(new RenderSystem(entityManager, scene));

  return {
    entities,
    systemsManager,
  };
};
