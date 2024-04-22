import { v4 as uuid4 } from "uuid";

export abstract class Entity {
  private id: string = "";

  constructor(id: string | undefined) {
    if (!id) {
      this.id = Entity.randomID();
    } else {
      this.id = id;
    }
  }

  public static randomID() {
    return uuid4();
  }

  public getId() {
    return this.id;
  }
}
