import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Styles from "./World.module.scss";
import { World, getWorld } from ".";

function World() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [world, setWorld] = useState<World>();

  console.log("World: ", world);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const world = getWorld(canvasRef.current);
      setWorld(world);
    }
  }, [canvasRef.current]);

  console.log("World: ", world);

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
