// components/JoinGame.js
import React, { useState } from 'react';
import io from 'socket.io-client';
import Link from 'next/link';

const JoinGame = () => {
  const [lobbyCode, setLobbyCode] = useState('');
  const socket = io('http://localhost:3001');

  const joinLobby = () => {
    socket.emit('joinLobby', lobbyCode);
  };

  socket.on('lobbyNotFound', () => {
    console.log('Lobby non trouvé');
    // Mettez à jour votre interface utilisateur pour gérer le cas où le lobby n'est pas trouvé
  });

  socket.on('playerJoined', players => {
    console.log('Un joueur a rejoint le lobby', players);
    // Mettez à jour votre interface utilisateur pour afficher la liste des joueurs
  });

  socket.on('playerLeft', players => {
    console.log('Un joueur a quitté le lobby', players);
    // Mettez à jour votre interface utilisateur pour afficher la liste des joueurs
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Code du Lobby"
        value={lobbyCode}
        onChange={(e) => setLobbyCode(e.target.value)}
      />
      <button onClick={joinLobby}>Rejoindre une partie</button>
      {/* Ajouter un lien vers une autre page après avoir rejoint la partie */}
      {lobbyCode && (
        <Link href={`/autre-page?lobbyCode=${lobbyCode}`}>
          <a>Aller à une autre page</a>
        </Link>
      )}
    </div>
  );
};

export default JoinGame;
