import { MeshComponent } from "../../building/components/mesh";
import { PositionComponent } from "../../building/components/position";
import { RenderComponent } from "../../building/components/render";
import type { EntityFunction } from "../index.d";
import * as B from "babylonjs";

const BlobCharacter: EntityFunction = (entityManager, worldState) => {
  const blob = entityManager.createEntity({
    name: "blobby",
  });

  const meshComponent = new MeshComponent(
    entityManager,
    blob.getId(),
    {
      mesh: B.MeshBuilder.CreateSphere(
        MeshComponent.getIDFromEntityID(blob.getId()),
        {
          segments: 32,
          diameter: 2,
        }
      ),
    },
    worldState
  );
  blob.addComponent(meshComponent);

  const positionComponent = new PositionComponent(
    entityManager,
    blob.getId(),
    {
      x: 0,
      y: 0.2,
      z: 0,
    },
    worldState
  );
  blob.addComponent(positionComponent);

  const renderComponent = new RenderComponent(
    entityManager,
    blob.getId(),
    {},
    worldState
  );
  blob.addComponent(renderComponent);
};

export const characterEntities = [BlobCharacter];
