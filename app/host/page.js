"use client"
import React, { useState } from 'react';
import io from 'socket.io-client';

const Heberger = () => {
  const [lobbyCode, setLobbyCode] = useState('');
  const socket = io('http://localhost:3002');

  const createLobby = () => {
    const code = generateCode();
    socket.emit('createLobby', code);
    setLobbyCode(code);
  };

  const generateCode = () => {
    return Math.random().toString(36).substring(7).toUpperCase();
  };

  return (
    <div>
      <h1>Page d'Hébergement</h1>
      <button onClick={createLobby}>Créer un lobby</button>
      {lobbyCode && <p>Code du lobby : {lobbyCode}</p>}
    </div>
  );
};

export default Heberger;