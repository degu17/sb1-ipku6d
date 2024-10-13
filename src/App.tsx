import React, { useState, useEffect } from 'react';
import RouletteWheel from './components/RouletteWheel';
import BettingArea from './components/BettingArea';
import PlayerInfo from './components/PlayerInfo';
import GameHistory from './components/GameHistory';
import PlayerRegistration from './components/PlayerRegistration';
import { Player, Bet, SpinResult, HistoryEntry } from './types';
import { Coins } from 'lucide-react';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [bets, setBets] = useState<Bet[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const registerPlayer = (name: string) => {
    const newPlayer: Player = {
      id: `player-${players.length + 1}`,
      name,
      balance: 1000, // Starting balance
    };
    setPlayers([...players, newPlayer]);
  };

  const handlePlaceBet = (bet: Bet) => {
    setBets([...bets, bet]);
    setPlayers(
      players.map((player) =>
        player.id === bet.playerId
          ? { ...player, balance: player.balance - bet.amount }
          : player
      )
    );
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  const handleSpin = (result: SpinResult) => {
    const winners = bets.filter((bet) => bet.number === result.number);
    const newHistory: HistoryEntry = {
      spinResult: result,
      winners: winners.map((winner) => ({
        playerId: winner.playerId,
        amount: winner.amount * 35,
      })),
    };

    setHistory([newHistory, ...history]);

    setPlayers(
      players.map((player) => {
        const winningBet = winners.find((winner) => winner.playerId === player.id);
        return winningBet
          ? { ...player, balance: player.balance + winningBet.amount * 35 }
          : player;
      })
    );

    setBets([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center">
        <Coins className="mr-2" /> Multiplayer Roulette
      </h1>
      {players.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Welcome to Multiplayer Roulette! Please register to play.</p>
          <PlayerRegistration onRegister={registerPlayer} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <RouletteWheel onSpin={handleSpin} />
            {players.length < 4 && <PlayerRegistration onRegister={registerPlayer} />}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Players</h2>
              {players.map((player) => (
                <PlayerInfo key={player.id} player={player} />
              ))}
            </div>
          </div>
          <div>
            <BettingArea
              currentPlayer={players[currentPlayerIndex]}
              onPlaceBet={handlePlaceBet}
            />
            <GameHistory history={history} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;