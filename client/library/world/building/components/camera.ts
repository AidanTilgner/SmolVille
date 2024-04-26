import { Component } from ".";
import { WorldState } from "../..";
import { EntityManager } from "../entities";
import * as B from "babylonjs";

interface FreeCameraData {
  type: "FreeCamera";
  camera: B.FreeCamera;
}

interface ArcRotateCameraData {
  type: "ArcRotateCamera";
  camera: B.ArcRotateCamera;
}

interface UniversalCameraData {
  type: "UniversalCamera";
  camera: B.UniversalCamera;
}

interface FollowCameraData {
  type: "FollowCamera";
  camera: B.FollowCamera;
}

interface DeviceOrientationCameraData {
  type: "DeviceOrientationCamera";
  camera: B.DeviceOrientationCamera;
}

interface VRDeviceOrientationFreeCameraData {
  type: "VRDeviceOrientationFreeCamera";
  camera: B.VRDeviceOrientationFreeCamera;
}

interface AnaglyphFreeCameraData {
  type: "AnaglyphFreeCamera";
  camera: B.AnaglyphFreeCamera;
}

interface StereoscopicFreeCameraData {
  type: "StereoscopicFreeCamera";
  camera: B.StereoscopicFreeCamera;
}

type CameraData =
  | FreeCameraData
  | ArcRotateCameraData
  | UniversalCameraData
  | FollowCameraData
  | DeviceOrientationCameraData
  | VRDeviceOrientationFreeCameraData
  | AnaglyphFreeCameraData
  | StereoscopicFreeCameraData;

export class CameraComponent extends Component {
  private cameraData: CameraData;

  constructor(
    entityManager: EntityManager,
    entityID: number,
    data: CameraData,
    worldState: WorldState
  ) {
    super(entityManager, entityID, "camera", worldState);
    this.cameraData = data;
    if (this.cameraData.camera.id) {
      this.cameraData.camera.id = CameraComponent.getIDFromEntityID(entityID);
    }
  }

  static getIDFromEntityID(entityID: number) {
    return `${entityID}-camera`;
  }

  getCamera<T>(): T {
    return this.cameraData.camera as T;
  }

  hasPosition(coords: { x: number; y: number; z: number }) {
    const { x, y, z } = this.cameraData.camera.position;
    const areEqual = coords.x === x && coords.y === y && coords.z === z;

    return areEqual;
  }

  updatePosition(coords: { x: number; y: number; z: number }) {
    const { x, y, z } = coords;
    this.cameraData.camera.position = new B.Vector3(x, y, z);
    return true;
  }

  getCameraID() {
    return this.cameraData.camera.id;
  }

  isInScene(scene: B.Scene) {
    return !!scene.getNodeById(this.getCameraID());
  }
}
