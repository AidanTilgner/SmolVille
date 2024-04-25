import { Component } from ".";
import { WorldState } from "../..";
import { EntityManager } from "../entities";

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
