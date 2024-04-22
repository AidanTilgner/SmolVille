import * as B from "babylonjs";
import { WorldState } from "../world";

export abstract class Component {
  private name: string = "";
  private worldState: WorldState | undefined = undefined;

  constructor(name: string, worldState: WorldState) {
    this.name = name;
    this.worldState = worldState;
  }

  public getName() {
    return this.name;
  }
}

export class PositionComponent extends Component {
  private x = 0;
  private y = 0;
  private z = 0;

  constructor(x = 0, y = 0, z = 0, worldState: WorldState) {
    super("position", worldState);
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

  update(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class VelocityComponent extends Component {
  private vx = 0;
  private vy = 0;

  constructor(vx = 0, vy = 0, worldState: WorldState) {
    super("velocity", worldState);
    this.vx = vx;
    this.vy = vy;
  }

  getVelocity() {
    return {
      vx: this.vx,
      vy: this.vy,
    };
  }

  update(vx: number, vy: number) {
    this.vx = vx;
    this.vy = vy;
  }
}
