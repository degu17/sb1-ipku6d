import React from 'react';
import { HistoryEntry } from '../types';

interface GameHistoryProps {
  history: HistoryEntry[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Game History</h3>
      <div className="overflow-y-auto h-48 border rounded">
        {history.map((entry, index) => (
          <div key={index} className="p-2 border-b last:border-b-0">
            <p>
              Spin Result: {entry.spinResult.number} (
              <span
                className={`font-bold ${
                  entry.spinResult.color === 'red'
                    ? 'text-red-600'
                    : entry.spinResult.color === 'black'
                    ? 'text-black'
                    : 'text-green-600'
                }`}
              >
                {entry.spinResult.color}
              </span>
              )
            </p>
            <p>
              Winners:{' '}
              {entry.winners.length > 0
                ? entry.winners.map((winner) => `${winner.playerId} ($${winner.amount})`).join(', ')
                : 'No winners'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;