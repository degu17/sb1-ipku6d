import React, { useState } from 'react';

interface PlayerRegistrationProps {
  onRegister: (name: string) => void;
}

const PlayerRegistration: React.FC<PlayerRegistrationProps> = ({ onRegister }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onRegister(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="border rounded p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Join Game
      </button>
    </form>
  );
};

export default PlayerRegistration;