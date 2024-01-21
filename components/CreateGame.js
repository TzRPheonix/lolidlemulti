// components/CreateGame.js
import React, { useState } from 'react';
import io from 'socket.io-client';
import Link from 'next/link';

const CreateGame = () => {
  const [lobbyCode, setLobbyCode] = useState('');
  const socket = io('http://localhost:3001');

  const createLobby = () => {
    socket.emit('createLobby');
  };

  socket.on('lobbyCreated', code => {
    console.log(`Lobby créé avec le code : ${code}`);
    setLobbyCode(code);
  });

  return (
    <div>
      <button onClick={createLobby}>Créer une partie</button>
      {lobbyCode && (
        <div>
          <p>Code de la partie : {lobbyCode}</p>
          <Link href={`/host?lobbyCode=${lobbyCode}`}>
            <a>Aller à la page Host</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreateGame;
