/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 earth.gltf
Author: Meee (https://sketchfab.com/Meee)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/earth-hologram-87072288fb234226b9a3f02ae674a310
Title: Earth hologram
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import earth from "./earth.gltf";

export function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(earth);
  const { actions } = useAnimations(animations, group);
  const action = actions["Take 01"];

  useEffect(() => {
    actions["Take 01"].play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.6}
        >
          <group name="Root">
            <group name="TERRE1" scale={3.27}>
              <mesh
                name="TERRE1_0"
                geometry={nodes.TERRE1_0.geometry}
                material={materials["Material.005"]}
              />
            </group>
            <group name="Sphere002" rotation={[0, 0, -3.01]} scale={0.97}>
              <mesh
                name="Sphere002_0"
                geometry={nodes.Sphere002_0.geometry}
                material={materials["Material.006"]}
              />
            </group>
            <group name="Circle643" scale={4.79}>
              <mesh
                name="Circle643_0"
                geometry={nodes.Circle643_0.geometry}
                material={materials["Material.004"]}
              />
            </group>
            <group name="Circle455" scale={0.18}>
              <mesh
                name="Circle455_0"
                geometry={nodes.Circle455_0.geometry}
                material={materials["Material.007"]}
                morphTargetDictionary={nodes.Circle455_0.morphTargetDictionary}
                morphTargetInfluences={nodes.Circle455_0.morphTargetInfluences}
              />
            </group>
            <group name="Circle" scale={6.13}>
              <group name="Icosphere002" position={[1, 0, 0]} scale={0.06}>
                <mesh
                  name="Icosphere002_0"
                  geometry={nodes.Icosphere002_0.geometry}
                  material={materials["Material.008"]}
                />
              </group>
              <mesh
                name="Circle_0"
                geometry={nodes.Circle_0.geometry}
                material={materials["Material.010"]}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(earth);
