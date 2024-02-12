import { Canvas } from '@react-three/fiber';
import React from 'react';
import StarsScene from './components/StarsScene';

export default function SpaceCanvas() {
      return (
            <div style={{ width: "100vw", height: "100vh" }}>
                  <Canvas style={{ background: '#000' }}>
                        <StarsScene />
                  </Canvas>
            </div>
      );
}
