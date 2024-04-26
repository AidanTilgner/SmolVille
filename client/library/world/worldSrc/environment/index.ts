import * as B from "babylonjs";
import type { EntityFunction } from "../index.d";
import { Component } from "../../building/components";
import { CameraComponent } from "../../building/components/camera";
import { LightComponent } from "../../building/components/light";
import {
  MaterialComponent,
  MeshComponent,
} from "../../building/components/mesh";
import { PositionComponent } from "../../building/components/position";
import { RenderComponent } from "../../building/components/render";

const MainCameraEntity: EntityFunction = (
  entityManager,
  worldState,
  canvas
) => {
  const camera = entityManager.createEntity({
    name: "Camera 1",
  });
  const cameraComponent = new CameraComponent(
    entityManager,
    camera.getId(),
    {
      camera: new B.FreeCamera(
        CameraComponent.getIDFromEntityID(camera.getId()),
        new B.Vector3(0, 0, 0)
      ),
      type: "FreeCamera",
    },
    worldState
  );
  const cm = cameraComponent.getCamera<B.FreeCamera>();
  cm.setTarget(B.Vector3.Zero());
  cm.attachControl(canvas);
  camera.addComponent(cameraComponent);

  const position = new PositionComponent(
    entityManager,
    camera.getId(),
    {
      x: 0,
      y: 5,
      z: -10,
    },
    worldState
  );
  camera.addComponent(position);

  const render = new RenderComponent(
    entityManager,
    camera.getId(),
    {},
    worldState
  );
  camera.addComponent(render);
};

const MainLightEntity: EntityFunction = (entityManager, worldState) => {
  const light = entityManager.createEntity({
    name: "Light 1",
  });
  const lightComponent = new LightComponent(
    entityManager,
    light.getId(),
    {
      light: new B.PointLight(
        LightComponent.getIDFromEntityID(light.getId()),
        new B.Vector3(0, 0, 0)
      ),
      type: "PointLight",
    },
    worldState
  );
  lightComponent.getLight().intensity = 5;
  light.addComponent(lightComponent);

  const positionComponent = new PositionComponent(
    entityManager,
    light.getId(),
    { x: 0, y: 2, z: -10 },
    worldState
  );
  light.addComponent(positionComponent);

  const render = new RenderComponent(
    entityManager,
    light.getId(),
    {},
    worldState
  );
  light.addComponent(render);
};

const GroundEntity: EntityFunction = (entityManager, worldState) => {
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

export const environmentEntities = [
  MainCameraEntity,
  MainLightEntity,
  GroundEntity,
];
