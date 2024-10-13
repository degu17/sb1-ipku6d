import React, { useState, useEffect } from 'react';
import { SpinResult } from '../types';

interface RouletteWheelProps {
  onSpin: (result: SpinResult) => void;
}

const numbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

const getColor = (number: number): 'red' | 'black' | 'green' => {
  if (number === 0) return 'green';
  return [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number) ? 'red' : 'black';
};

const RouletteWheel: React.FC<RouletteWheelProps> = ({ onSpin }) => {
  const [spinning, setSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [ballRotation, setBallRotation] = useState(0);
  const [ballPosition, setBallPosition] = useState(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const randomNumber = Math.floor(Math.random() * 37);
    const newWheelRotation = 360 * 5 + (360 / 37) * randomNumber;
    const newBallRotation = 360 * 10 + (360 / 37) * randomNumber;
    
    setWheelRotation(newWheelRotation);
    setBallRotation(newBallRotation);

    setTimeout(() => {
      setSpinning(false);
      setBallPosition((360 / 37) * randomNumber);
      onSpin({ number: numbers[randomNumber], color: getColor(numbers[randomNumber]) });
    }, 5000);
  };

  return (
    <div className="relative w-80 h-80 mx-auto">
      <div
        className="absolute w-full h-full rounded-full border-8 border-gray-800 overflow-hidden transition-transform duration-5000 ease-out"
        style={{ transform: `rotate(${wheelRotation}deg)` }}
      >
        {numbers.map((number, index) => (
          <div
            key={number}
            className={`absolute w-10 h-40 flex items-start justify-center pt-1 text-white text-xs font-bold ${
              getColor(number) === 'red' ? 'bg-red-600' : getColor(number) === 'black' ? 'bg-black' : 'bg-green-600'
            }`}
            style={{
              transform: `rotate(${(index * 360) / 37}deg)`,
              transformOrigin: 'bottom center',
            }}
          >
            {number}
          </div>
        ))}
      </div>
      <div
        className="absolute w-6 h-6 rounded-full bg-white border-2 border-gray-800 transition-transform duration-5000 ease-out"
        style={{
          top: '10px',
          left: 'calc(50% - 12px)',
          transform: `rotate(${ballRotation}deg) translateY(-140px) rotate(-${ballPosition}deg)`,
        }}
      />
      <button
        onClick={spin}
        disabled={spinning}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white px-4 py-2 rounded-full font-bold disabled:opacity-50 z-10"
      >
        {spinning ? 'Spinning...' : 'SPIN'}
      </button>
    </div>
  );
};

export default RouletteWheel;