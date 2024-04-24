import * as B from "babylonjs";
import { WorldState } from "..";
import { EntityManager } from "./entities";

export type IComponentType =
  | "render"
  | "position"
  | "velocity"
  | "mesh"
  | "material"
  | "camera"
  | "id"
  | "light";

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
      return;
    }

    if (!e.hasComponent("position")) {
      throw `Error: attempting to render entity which has no position component (entity: ${e.getName()})`;
    }
    if (!e.hasComponent("mesh")) {
      throw `Error: attempting to render entity which has no mesh component (entity: ${e.getName()})`;
    }

    const meshComp = e.getComponent<MeshComponent>("mesh");

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

export class LightComponent extends Component {
  private light: B.Light;

  constructor(
    entityManager: EntityManager,
    entityID: number,
    data: {
      light: B.Light;
    },
    worldState: WorldState
  ) {
    super(entityManager, entityID, "light", worldState);
    const { light } = data;
    this.light = light;
    if (!this.light.id) {
      this.light.id = LightComponent.getIDFromEntityID(entityID);
    }
  }

  static getIDFromEntityID(entityID: number) {
    return `${entityID}-light`;
  }

  getLight() {
    return this.light;
  }

  getLightId() {
    return this.light.id;
  }

  isInScene(scene: B.Scene) {
    return !!scene.getNodeById(this.getLightId());
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
