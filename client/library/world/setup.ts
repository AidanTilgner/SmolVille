import {
  CameraComponent,
  LightComponent,
  MaterialComponent,
  MeshComponent,
  PositionComponent,
  RenderComponent,
} from "./building/components";
import { EntityManager } from "./building/entities";
import {
  MovementSystem,
  RenderSystem,
  SystemManager,
} from "./building/systems";
import { WorldState } from ".";
import * as B from "babylonjs";

export const entityManager = new EntityManager();
const worldState: WorldState = {
  frame: 0,
};

const MainCameraEntity = () => {
  const camera = entityManager.createEntity({
    name: "Camera 1",
  });
  const cameraComponent = new CameraComponent(
    entityManager,
    camera.getId(),
    {
      camera: new B.FreeCamera(
        CameraComponent.getIDFromEntityID(camera.getId()),
        new B.Vector3(0, 5, -10)
      ),
    },
    worldState
  );
  cameraComponent.getCamera<B.FreeCamera>().setTarget(B.Vector3.Zero());
  camera.addComponent(cameraComponent);

  const render = new RenderComponent(
    entityManager,
    camera.getId(),
    {},
    worldState
  );
  camera.addComponent(render);
};

const MainLightEntity = () => {
  const light = entityManager.createEntity({
    name: "Light 1",
  });
  const lightComponent = new LightComponent(
    entityManager,
    light.getId(),
    {
      light: new B.HemisphericLight(
        LightComponent.getIDFromEntityID(light.getId()),
        new B.Vector3(0, 1, 0)
      ),
    },
    worldState
  );
  light.addComponent(lightComponent);

  const render = new RenderComponent(
    entityManager,
    light.getId(),
    {},
    worldState
  );
  light.addComponent(render);
};

const GroundEntity = () => {
  const ground = entityManager.createEntity({
    name: "Ground 1",
  });
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
      mesh: B.MeshBuilder.CreateGround(
        MeshComponent.getIDFromEntityID(ground.getId()),
        {
          width: 100,
          height: 2,
          subdivisions: 10,
          updatable: false,
        }
      ),
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

  const render = new RenderComponent(
    entityManager,
    ground.getId(),
    {},
    worldState
  );
  ground.addComponent(render);
};

// TODO: HOW CAN I ORGANIZE THIS BETTER?

const entities = [MainCameraEntity, MainLightEntity, GroundEntity];

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
