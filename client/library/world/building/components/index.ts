import { WorldState } from "../..";
import { EntityManager } from "../entities";

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
