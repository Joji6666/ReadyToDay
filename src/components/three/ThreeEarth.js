import React from "react";
import { Canvas } from "@react-three/fiber";

import { OrbitControls } from "@react-three/drei";
import { Model } from "./Earth";

export default function ThreeEarth() {
  return (
    <>
      <Canvas className="canvas">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={1} />
        <directionalLight position={[-3, 5, 2]} intensity={1} />
        <Model />
      </Canvas>
    </>
  );
}
