import { WorldState } from "..";
import { EntityManager } from "../building/entities";

export type EntityFunction = (
  entityManager: EntityManager,
  worldState: WorldState
) => void;
