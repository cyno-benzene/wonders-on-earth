/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 mars.gltf 
Author: PatelDev (https://sketchfab.com/PatelDev)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/mars-0bbd08db494b4e2a873c624021248d12
Title: Mars
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function MarsModel(props) {
  const { nodes, materials } = useGLTF('mars.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} scale={1.979} />
    </group>
  )
}

useGLTF.preload('mars.gltf')
