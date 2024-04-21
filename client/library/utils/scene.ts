import * as B from "babylonjs";

export const createScene = (engine: B.Engine, canvas: HTMLCanvasElement) => {
  // Initialize the scene with the defined engine
  const scene = new B.Scene(engine);
  // Initialize a camera at location 0, 5, -10, in the above defined scene
  const camera = new B.FreeCamera("camera1", new B.Vector3(0, 5, -10), scene);
  // Point the camera at the origin/center of the scene
  camera.setTarget(B.Vector3.Zero());
  // Attack the camera to the canvas
  camera.attachControl(canvas, false);

  // Create a basic light
  const light = new B.HemisphericLight("light1", new B.Vector3(0, 1, 0), scene);
  // create a built-in "sphere" shape using the spherebuilder
  const sphere = B.MeshBuilder.CreateSphere(
    "sphere1",
    {
      segments: 16,
      diameter: 2,
      sideOrientation: B.Mesh.FRONTSIDE,
    },
    scene
  );
  // move the sphere
  sphere.position.y = 1;
  // create a built-in "ground" shape
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

  return scene;
};
