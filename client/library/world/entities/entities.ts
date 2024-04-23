import { v4 as uuid4 } from "uuid";
import { Component, IComponentType } from "./components";

export class EntityManager {
  private entities: Map<number, Entity>;
  private nextId: number;

  constructor() {
    this.entities = new Map();
    this.nextId = 0;
  }

  public createEntity() {
    const entity = new Entity(this.nextId++);
    this.entities.set(entity.getId(), entity);
    entity.onCreate();
    return entity;
  }

  public getEntity(id: number) {
    const entity = this.entities.get(id);
    entity?.onAccess();
    return entity;
  }

  public getEntitiesMap() {
    return this.entities;
  }

  public getAllEntities(): Entity[] {
    return Array.from(this.entities.values());
  }

  public removeEntity(id: number) {
    const entity = this.entities.get(id);
    entity?.onDestroy();
    return this.entities.delete(id);
  }
}

export class Entity {
  private id: number;
  private components: Map<IComponentType, Component>;
  public onCreate: () => void;
  public onUpdate: () => void;
  public onDestroy: () => void;
  public onAccess: () => void;

  constructor(id: number) {
    this.id = id;
    this.components = new Map();

    this.onCreate = () => {};
    this.onUpdate = () => {};
    this.onDestroy = () => {};
    this.onAccess = () => {};
  }

  public getId() {
    return this.id;
  }

  public addComponent(component: Component) {
    this.components.set(component.getType(), component);
  }

  public getComponent<T>(componentType: IComponentType): T {
    return this.components.get(componentType) as T;
  }

  public hasComponent(componentType: IComponentType) {
    return this.components.has(componentType);
  }
}
