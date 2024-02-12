import React, { useRef } from 'react';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

const StarsScene = () => {
  const starFieldRef = useRef();

  return (
    <EffectComposer>
      <ChromaticAberration offset={[0.001, 0]} blendFunction={1} />
      <Bloom
        kernelSize={3}
        luminanceThreshold={0.1}
        luminanceSmoothing={0.5}
        intensity={1.0}
      />
      <Stars
        ref={starFieldRef}
        depth={500}
        count={5000}
        factor={5}
        saturation={0}
        fade
      />
    </EffectComposer>
  );
};

export default StarsScene;