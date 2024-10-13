import React, { useState } from 'react';
import { Bet, Player } from '../types';

interface BettingAreaProps {
  currentPlayer: Player;
  onPlaceBet: (bet: Bet) => void;
}

const BettingArea: React.FC<BettingAreaProps> = ({ currentPlayer, onPlaceBet }) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<number>(0);

  const handlePlaceBet = () => {
    if (selectedNumber !== null && betAmount > 0 && betAmount <= currentPlayer.balance) {
      onPlaceBet({
        playerId: currentPlayer.id,
        amount: betAmount,
        number: selectedNumber,
      });
      setSelectedNumber(null);
      setBetAmount(0);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Place Your Bet</h3>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {Array.from({ length: 37 }, (_, i) => (
          <button
            key={i}
            onClick={() => setSelectedNumber(i)}
            className={`p-2 rounded ${
              selectedNumber === i
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {i}
          </button>
        ))}
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Math.max(0, parseInt(e.target.value) || 0))}
          className="border rounded p-2 w-24"
          placeholder="Amount"
        />
        <button
          onClick={handlePlaceBet}
          disabled={selectedNumber === null || betAmount <= 0 || betAmount > currentPlayer.balance}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Place Bet
        </button>
      </div>
      <p className="text-sm">
        Selected Number: {selectedNumber !== null ? selectedNumber : 'None'} | Bet Amount: ${betAmount}
      </p>
    </div>
  );
};

export default BettingArea;