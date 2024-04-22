import * as B from "babylonjs";

export const createScene = (engine: B.Engine, canvas: HTMLCanvasElement) => {
  const scene = new B.Scene(engine);
  scene.clearColor = new B.Color4(0, 0, 0, 0.5);
  const camera = new B.FreeCamera("camera1", new B.Vector3(0, 5, -10), scene);
  camera.setTarget(B.Vector3.Zero());
  camera.attachControl(canvas, false);

  const light = new B.HemisphericLight("light1", new B.Vector3(0, 1, 0), scene);
  light.diffuse = B.Color3.FromInts(8, 2, 245);
  light.intensity = 1;
  const box = B.MeshBuilder.CreateBox(
    "box1",
    {
      sideOrientation: B.Mesh.FRONTSIDE,
      size: 3,
      width: 2,
      height: 2,
    },
    scene
  );
  box.position.y = 1;
  const boxMaterial = new B.StandardMaterial("sphereMaterial1", scene);
  boxMaterial.diffuseColor = B.Color3.FromInts(255, 255, 255);
  box.material = boxMaterial;

  const ground = B.MeshBuilder.CreateGround(
    "ground1",
    {
      width: 6,
      height: 6,
      subdivisions: 2,
      updatable: false,
    },
    scene
  );
  const groundMaterial = new B.StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseColor = new B.Color3(128 / 255, 128 / 255, 128 / 255);
  ground.material = groundMaterial;

  return scene;
};
