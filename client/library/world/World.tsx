import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import Styles from "./World.module.scss";
import Entities from "./Entities";

function World() {
  return (
    <div className={Styles.world}>
      <Canvas>
        <ambientLight />
        <pointLight position={[2, 0, 0]} />
        <Entities.Box position={[-1.2, 0, 0]} />
        <Entities.Box position={[1.2, 0, 0]} />
        <Entities.Platform position={[0, 2, 0]} />
      </Canvas>
    </div>
  );
}

export default World;
