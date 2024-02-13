import { Canvas } from '@react-three/fiber';
import React from 'react';
import StarsScene from './components/StarsScene';
import EarthModel from './components/EarthModel';
import { OrbitControls } from '@react-three/drei';

export default function SpaceCanvas() {
      return (
            <div className='container' style={{ width: "100vw", height: "100vh" }}>
                  <Canvas className="overlap" style={{ background: '#000' }}>
                        <StarsScene />
                        {/* <ambientLight /> */}
                        <pointLight intensity={500} position={[10, 5, 10]} />
                        <EarthModel />
                        <OrbitControls
                              enableZoom={true}
                              enablePan={true}
                              enableRotate={true}
                        />
                  </Canvas>
                  <div className="overlap">
                        <h2>The Earth</h2>
                  </div>
                  <button className="travel-button" type="button">{'>'}</button>
            </div>
      );
}
// https://www.youtube.com/watch?v=rWFaJNcx-Xk