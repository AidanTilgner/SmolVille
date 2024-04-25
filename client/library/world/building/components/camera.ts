import { Component } from ".";
import { WorldState } from "../..";
import { EntityManager } from "../entities";
import * as B from "babylonjs";

export class CameraComponent extends Component {
  private camera: B.Camera;

  constructor(
    entityManager: EntityManager,
    entityID: number,
    data: {
      camera: B.Camera;
    },
    worldState: WorldState
  ) {
    super(entityManager, entityID, "camera", worldState);
    const { camera } = data;
    this.camera = camera;
    if (this.camera.id) {
      this.camera.id = CameraComponent.getIDFromEntityID(entityID);
    }
  }

  static getIDFromEntityID(entityID: number) {
    return `${entityID}-camera`;
  }

  getCamera<T>(): T {
    return this.camera as T;
  }

  getCameraID() {
    return this.camera.id;
  }

  isInScene(scene: B.Scene) {
    return !!scene.getNodeById(this.getCameraID());
  }
}
