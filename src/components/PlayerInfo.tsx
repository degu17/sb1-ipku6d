import React from 'react';
import { Player } from '../types';

interface PlayerInfoProps {
  player: Player;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">{player.name}</h3>
      <p className="text-gray-600">Balance: ${player.balance}</p>
    </div>
  );
};

export default PlayerInfo;