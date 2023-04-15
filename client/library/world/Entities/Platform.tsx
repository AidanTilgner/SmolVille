import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function Platform({ position }: { position: [number, number, number] }) {
  return (
    <mesh>
      <BaseCylinder position={position} />
    </mesh>
  );
}

export default Platform;

function BaseCylinder({ position }: { position: [number, number, number] }) {
  const cylinderRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (cylinderRef.current) {
      cylinderRef.current.rotation.x += 0.01;
      cylinderRef.current.rotation.y += 0.005;
      cylinderRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh position={position} ref={cylinderRef}>
      <cylinderGeometry attach={"geometry"} args={[1, 1, 0.5, 16]} />
      <meshStandardMaterial
        attach={"material"}
        color={"#2256f2"}
        flatShading={false}
      />
    </mesh>
  );
}
