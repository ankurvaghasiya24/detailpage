import React, { useState, useEffect } from 'react';
import loading from '../assets/loadingsvg.png'

const PencilLoading = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="relative">
        {/* Pencil SVG Shape */}
        <svg
          className="w-20 h-20 text-gray-600 animate-pulse"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="none"
          stroke="black"
          strokeWidth="5"
        >
          <path d="M10 40 L40 10 L70 40 L40 70 L10 40" />
        </svg>
        <span className="absolute text-xl text-gray-700 font-semibold top-1/3 left-1/3">
          Loading...
        </span>
      </div>
    </div>
  );
}

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <PencilLoading />
      ) : (
        <div className="">
            {/* <Hero1 /> */}
        </div>
      )}
    </div>
  );
}

export default Loading;


