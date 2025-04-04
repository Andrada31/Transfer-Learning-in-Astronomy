import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Placeholder = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="aspect-square w-100"
        style={{ cursor: 'pointer' }}
      >
        <DotLottieReact
          src="src/components/custom/placeholder.lottie"
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default Placeholder;
