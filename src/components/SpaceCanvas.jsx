import { Canvas } from '@react-three/fiber';

import EarthModel from './EarthModel';
// import MarsModel from './MarsModel';

export default function SpaceCanvas() {
      return (
            <div style={{ width: "100vw", height: "100vh" }}>
                  <Canvas background={{}}>
                        <ambientLight intensity={1} />
                        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
                  </Canvas>
            </div>
      );
}
// https://redstapler.co/space-warp-background-effect-three-js/
