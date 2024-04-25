import { Component } from ".";
import { WorldState } from "../..";
import { EntityManager } from "../entities";
import * as B from "babylonjs";

interface PointLightData {
  type: "PointLight";
  light: B.PointLight;
}

interface DirectionalLightData {
  type: "DirectionalLight";
  light: B.DirectionalLight;
}

interface SpotLightData {
  type: "SpotLight";
  light: B.SpotLight;
}

interface HemisphericLightData {
  type: "HemisphericLight";
  light: B.HemisphericLight;
}

type LightData =
  | PointLightData
  | DirectionalLightData
  | SpotLightData
  | HemisphericLightData;

export class LightComponent extends Component {
  private lightData: LightData;

  constructor(
    entityManager: EntityManager,
    entityID: number,
    data: LightData,
    worldState: WorldState
  ) {
    super(entityManager, entityID, "light", worldState);
    this.lightData = data;
    if (!this.lightData.light.id) {
      this.lightData.light.id = LightComponent.getIDFromEntityID(entityID);
    }
  }

  static getIDFromEntityID(entityID: number) {
    return `${entityID}-light`;
  }

  getLight() {
    return this.lightData.light;
  }

  getLightId() {
    return this.lightData.light.id;
  }

  canUpdatePosition() {
    return (
      this.lightData.type === "PointLight" ||
      this.lightData.type === "SpotLight" ||
      this.lightData.type === "DirectionalLight"
    );
  }

  hasPosition(coords: { x: number; y: number; z: number }) {
    if (
      this.lightData.type === "PointLight" ||
      this.lightData.type === "SpotLight" ||
      this.lightData.type === "DirectionalLight"
    ) {
      const { x, y, z } = this.lightData.light.position;
      const areEqual = coords.x === x && coords.y === y && coords.z === z;

      return areEqual;
    }
    return false;
  }

  updatePosition(coords: { x: number; y: number; z: number }) {
    if (
      this.lightData.type === "PointLight" ||
      this.lightData.type === "SpotLight" ||
      this.lightData.type === "DirectionalLight"
    ) {
      const { x, y, z } = coords;
      return (this.lightData.light.position = new B.Vector3(x, y, z));
    }
    throw "Can't update position of light without position property";
  }

  updateDirection(coords: { x: number; y: number; z: number }) {
    const { x, y, z } = coords;
    this.lightData.light.direction = new B.Vector3(x, y, z);
  }

  isInScene(scene: B.Scene) {
    return !!scene.getNodeById(this.getLightId());
  }
}
