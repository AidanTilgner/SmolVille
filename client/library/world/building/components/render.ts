import { Component } from ".";
import { EntityManager } from "../entities";
import { WorldState } from "../..";
import { LightComponent } from "./light";
import { CameraComponent } from "./camera";
import * as B from "babylonjs";
import { PositionComponent } from "./position";
import { MaterialComponent, MeshComponent } from "./mesh";

export class RenderComponent extends Component {
  constructor(
    entityManger: EntityManager,
    entityID: number,
    data: {},
    worldState: WorldState
  ) {
    super(entityManger, entityID, "render", worldState);
  }

  render(scene: B.Scene) {
    const e = this.getMyEntity();
    if (!e) {
      throw `Error: no entity found on component ${this.getType()}`;
    }

    if (e.hasComponent("camera")) {
      const cameraComp = e.getComponent<CameraComponent>("camera");
      if (!cameraComp.isInScene(scene)) {
        scene.addCamera(cameraComp.getCamera());
      }
      return;
    }

    if (e.hasComponent("light")) {
      const lightComp = e.getComponent<LightComponent>("light");
      if (!lightComp.isInScene(scene)) {
        scene.addLight(lightComp.getLight());
      }
      if (e.hasComponent("position")) {
        const positionComp = e.getComponent<PositionComponent>("position");
        const position = positionComp.getPosition();
        if (lightComp.canUpdatePosition() && !lightComp.hasPosition(position)) {
          lightComp.updatePosition(position);
        }
      }
      return;
    }

    if (!e.hasComponent("position")) {
      throw `Error: attempting to render entity which has no position component (entity: ${e.getName()})`;
    }
    if (!e.hasComponent("mesh")) {
      throw `Error: attempting to render entity which has no mesh component (entity: ${e.getName()})`;
    }

    const meshComp = e.getComponent<MeshComponent>("mesh");
    const positionComp = e.getComponent<PositionComponent>("position");
    const { x, y, z } = positionComp.getPosition();
    meshComp.getMesh().position = new B.Vector3(x, y, z);

    if (!meshComp.isInScene(scene)) {
      console.log("Adding mesh which wasn't previously in scene", e.getName());
      scene.addMesh(meshComp.getMesh());

      if (e.hasComponent("material")) {
        const materialComp = e.getComponent<MaterialComponent>("material");
        meshComp.getMesh().material = materialComp.getMaterial();
      }
    }
  }
}
