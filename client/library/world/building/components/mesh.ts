import { Component } from ".";
import { WorldState } from "../..";
import { EntityManager } from "../entities";
import * as B from "babylonjs";

export class MeshComponent extends Component {
  private mesh: B.Mesh;

  constructor(
    entityManager: EntityManager,
    entityID: number,
    data: {
      mesh: B.Mesh;
    },
    worldState: WorldState
  ) {
    super(entityManager, entityID, "mesh", worldState);
    const { mesh } = data;
    this.mesh = mesh;
    if (!this.mesh.id) {
      this.mesh.id = MeshComponent.getIDFromEntityID(entityID);
    }
  }

  static getIDFromEntityID(entityID: number) {
    return `${entityID}-mesh`;
  }

  getMesh() {
    return this.mesh;
  }

  getMeshID() {
    return this.mesh.id;
  }

  isInScene(scene: B.Scene) {
    return !!scene.getNodeById(this.getMeshID());
  }
}

export class MaterialComponent extends Component {
  private material: B.Material;

  constructor(
    entityManager: EntityManager,
    entityID: number,
    data: {
      material: B.Material;
    },
    worldState: WorldState
  ) {
    super(entityManager, entityID, "material", worldState);
    const { material } = data;
    this.material = material;
  }

  getMaterial<T>(): T {
    return this.material as T;
  }
}
