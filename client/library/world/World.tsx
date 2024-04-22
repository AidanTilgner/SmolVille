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

function World() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<B.Engine>();

  useLayoutEffect(() => {
    if (canvasRef.current) {
      setEngine((prev) => {
        return new B.Engine(canvasRef.current, false, {
          preserveDrawingBuffer: true,
          stencil: true,
        });
      });
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (canvasRef.current && engine) {
      const scene = createScene(engine, canvasRef.current);
      engine.runRenderLoop(() => {
        scene.render();
      });
    }
    const onWindowResize = () => {
      engine?.resize();
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [engine]);

  return (
    <div className={Styles.world}>
      <canvas className={Styles.worldCanvas} ref={canvasRef} />
    </div>
  );
}

export default World;
