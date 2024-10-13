export interface Player {
  id: string;
  name: string;
  balance: number;
}

export interface Bet {
  playerId: string;
  amount: number;
  number: number;
}

export interface SpinResult {
  number: number;
  color: 'red' | 'black' | 'green';
}

export interface HistoryEntry {
  spinResult: SpinResult;
  winners: { playerId: string; amount: number }[];
}