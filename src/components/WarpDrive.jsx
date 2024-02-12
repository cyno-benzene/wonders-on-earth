import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { LineSegments, BufferGeometry, BufferAttribute, LineBasicMaterial, MathUtils } from 'three';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

const LINE_COUNT = 90000;

const WarpDrive = (props) => {
  const { scene, clock } = useThree();
  const linesRef = useRef();

  useEffect(() => {
    const geom = new BufferGeometry();
    geom.setAttribute("position", new BufferAttribute(new Float32Array(6 * LINE_COUNT), 3));
    geom.setAttribute("velocity", new BufferAttribute(new Float32Array(2 * LINE_COUNT), 1));
    const pos = geom.getAttribute("position").array;
    const va = geom.getAttribute("velocity").array;

    for (let lineIndex = 0; lineIndex < LINE_COUNT; lineIndex++) {
      const x = Math.random() * 400 - 200;
      const y = Math.random() * 200 - 100;
      const z = Math.random() * 500 - 100;

      pos[6 * lineIndex] = x;
      pos[6 * lineIndex + 1] = y;
      pos[6 * lineIndex + 2] = z;

      pos[6 * lineIndex + 3] = x;
      pos[6 * lineIndex + 4] = y;
      pos[6 * lineIndex + 5] = z;

      va[2 * lineIndex] = va[2 * lineIndex + 1] = 0;
    }

    const mat = new LineBasicMaterial({ color: 0xffffff });
    const lines = new LineSegments(geom, mat);
    linesRef.current = lines;
    scene.add(lines);

    return () => {
      scene.remove(lines);
    };
  }, [scene]);

  useFrame(() => {
    const pos = linesRef.current.geometry.getAttribute("position").array;
    const va = linesRef.current.geometry.getAttribute("velocity").array;
  
    // Check if the animation should end
    if (clock.elapsedTime *  1000 >= props.duration) {
      // Calculate the remaining duration of the animation
      const remainingDuration = (clock.elapsedTime *  1000) - props.duration;
      const totalDecelerationDuration =  1; //  1 second for example
  
      // Use smoothStep to interpolate the remaining duration
      const decelerationFactor = MathUtils.smoothstep(remainingDuration, totalDecelerationDuration, remainingDuration);
  
      // Decelerate the velocities and positions based on the deceleration factor
      for (let lineIndex =  0; lineIndex < LINE_COUNT; lineIndex++) {
        va[2 * lineIndex] -= decelerationFactor *  0.03;
        va[2 * lineIndex +  1] -= decelerationFactor *  0.025;
        pos[6 * lineIndex +  2] += va[2 * lineIndex];
        pos[6 * lineIndex +  5] += va[2 * lineIndex +  1];
  
        // Reset positions and velocities to initial values if they go below certain thresholds
        if (va[2 * lineIndex] <  0.01 && va[2 * lineIndex +  1] <  0.01) {
          const x = Math.random() *  400 -  200;
          const y = Math.random() *  200 -  100;
          const z = Math.random() *  500 -  100;
  
          pos[6 * lineIndex] = x;
          pos[6 * lineIndex +  1] = y;
          pos[6 * lineIndex +  2] = z;
  
          pos[6 * lineIndex +  3] = x;
          pos[6 * lineIndex +  4] = y;
          pos[6 * lineIndex +  5] = z;
  
          va[2 * lineIndex] = va[2 * lineIndex +  1] =  0;
        }
      }
      // Set needsUpdate to true to reflect the changes in the buffer attributes
      linesRef.current.geometry.getAttribute("position").needsUpdate = true;
      linesRef.current.geometry.getAttribute("velocity").needsUpdate = true;
    } else {
      // Continue with the animation
      for (let lineIndex =  0; lineIndex < LINE_COUNT; lineIndex++) {
        va[2 * lineIndex] +=  0.03;
        va[2 * lineIndex +  1] +=  0.025;
        pos[6 * lineIndex +  2] += va[2 * lineIndex];
        pos[6 * lineIndex +  5] += va[2 * lineIndex +  1];
  
        if (pos[6 * lineIndex +  5] >  200) {
          const z = Math.random() *  200 -  100;
          pos[6 * lineIndex +  2] = z;
          pos[6 * lineIndex +  5] = z;
          va[2 * lineIndex] =  0;
          va[2 * lineIndex +  1] =  0;
        }
      }
      // Set needsUpdate to true to reflect the changes in the buffer attributes
      linesRef.current.geometry.getAttribute("position").needsUpdate = true;
    }
  });
  
  return (
    <EffectComposer>
      <Bloom
        kernelSize={3}
        luminanceThreshold={0.1}
        luminanceSmoothing={0.5}
        intensity={1.0}
      />
      <ChromaticAberration offset={[0.001, 0]} blendFunction={1} />
    </EffectComposer>
  );
};

export default WarpDrive;


{/* 
Declaring in parent component
<Suspense>
  <WarpDrive duration={3000} />
</Suspense>
*/}