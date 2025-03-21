import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SolarSystem = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="aspect-square w-100">
        <DotLottieReact
          src="src/components/custom/SolarSystem.lottie"
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default SolarSystem;
