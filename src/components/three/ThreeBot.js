import React from "react";
import { Canvas } from "@react-three/fiber";

import { OrbitControls } from "@react-three/drei";

import { Bot } from "./Bot";

export default function ThreeBot() {
  return (
    <>
      <Canvas className="canvas">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={1} />
        <directionalLight position={[-3, 5, 2]} intensity={1} />
        <Bot />
      </Canvas>
    </>
  );
}
