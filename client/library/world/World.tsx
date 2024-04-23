import React, {
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";
import Styles from "./World.module.scss";
import * as B from "babylonjs";
import { createScene } from "./scene/scene";
import { World, getWorld } from "./world";

function World() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [world, setWorld] = useState<World>();

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const world = getWorld(canvasRef.current);
      setWorld(world);
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (!world) {
      return;
    }

    let lastFrameTime = performance.now();

    world.engine.runRenderLoop(() => {
      const now = performance.now();
      const deltaTime = (now - lastFrameTime) / 1000;

      world.systemsManager.updateAll(deltaTime);
      world.scene.render();
    });
    const onWindowResize = () => {
      world.engine?.resize();
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [world]);

  return (
    <div className={Styles.world}>
      <canvas className={Styles.worldCanvas} ref={canvasRef} />
    </div>
  );
}

export default World;
