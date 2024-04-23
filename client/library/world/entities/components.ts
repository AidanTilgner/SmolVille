import * as B from "babylonjs";
import { WorldState } from "../world";
import { EntityManager } from "./entities";

export type IComponentType =
  | "render"
  | "position"
  | "velocity"
  | "mesh"
  | "material";

export abstract class Component {
  private type: IComponentType;
  private worldState: WorldState;
  private entityManager: EntityManager;
  private entityID: number;

  constructor(
    entityManager: EntityManager,
    entityID: number,
    type: IComponentType,
    worldState: WorldState
  ) {
    this.entityManager = entityManager;
    this.entityID = entityID;
    this.type = type;
    this.worldState = worldState;
  }

  public getType() {
    return this.type;
  }

  public getMyEntity() {
    return this.entityManager.getEntity(this.entityID);
  }
}

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
    if (!e.hasComponent("position")) {
      throw `Error: attempting to render entity which has no position component (${this.getType()})`;
    }
    if (!e.hasComponent("mesh")) {
      throw `Error: attempting to render entity which has no mesh component (${this.getType()})`;
    }

    const meshComp = e.getComponent<MeshComponent>("mesh");

    if (meshComp.getMesh().getScene() !== scene) {
      scene.addMesh(meshComp.getMesh());
    }

    if (e.hasComponent("material")) {
      const materialComp = e.getComponent<MaterialComponent>("material");
      meshComp.getMesh().material = materialComp.getMaterial();
    }
  }
}

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
  }

  getMesh() {
    return this.mesh;
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

export class PositionComponent extends Component {
  private x = 0;
  private y = 0;
  private z = 0;

  constructor(
    entityManager: EntityManager,
    entityID: number,
    data: { x: number; y: number; z: number },
    worldState: WorldState
  ) {
    super(entityManager, entityID, "position", worldState);
    const { x, y, z } = data;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }

  setPosition(data: { x: number; y: number; z: number }) {
    const { x, y, z } = data;
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class VelocityComponent extends Component {
  private vx = 0;
  private vy = 0;
  private vz = 0;

  constructor(
    entityManager: EntityManager,
    entityID: number,
    data: { vx: number; vy: number; vz: number },
    worldState: WorldState
  ) {
    super(entityManager, entityID, "velocity", worldState);
    const { vx, vy, vz } = data;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
  }

  getVelocity() {
    return {
      vx: this.vx,
      vy: this.vy,
      vz: this.vz,
    };
  }

  setVelocity(data: { vx: number; vy: number; vz: number }) {
    const { vx, vy, vz } = data;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
  }
}
