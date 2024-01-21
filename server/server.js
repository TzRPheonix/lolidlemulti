const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);


const port = 3002;

app.use(cors());

//Création du serveur
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lolmulti',
});

connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connexion à la base de données réussie');
  }
});

const lobbies = {};

io.on('connection', socket => {
  console.log('Un utilisateur s\'est connecté');

  // Gestion de la création d'un lobby
  socket.on('createLobby', () => {
    const lobbyCode = generateRandomCode();
    lobbies[lobbyCode] = { players: [socket.id], gameData: null };
    socket.join(lobbyCode);
    socket.emit('lobbyCreated', lobbyCode);
  });

  // Gestion de la rejoindre d'un lobby
  socket.on('joinLobby', lobbyCode => {
    if (lobbies[lobbyCode]) {
      lobbies[lobbyCode].players.push(socket.id);
      socket.join(lobbyCode);
      io.to(lobbyCode).emit('playerJoined', lobbies[lobbyCode].players);
    } else {
      socket.emit('lobbyNotFound');
    }
  });

  // Fonction pour générer un code aléatoire
  function generateRandomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Déconnexion de l'utilisateur
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
    // Supprimer le joueur des lobbys en cours
    Object.keys(lobbies).forEach(lobbyCode => {
      const index = lobbies[lobbyCode].players.indexOf(socket.id);
      if (index !== -1) {
        lobbies[lobbyCode].players.splice(index, 1);
        io.to(lobbyCode).emit('playerLeft', lobbies[lobbyCode].players);
        // Si le lobby est vide, le supprimer
        if (lobbies[lobbyCode].players.length === 0) {
          delete lobbies[lobbyCode];
        }
      }
    });
  });
});

// Routes pour la gestion des champions (comme mentionné précédemment)
app.get('/champions', (req, res) => {
  connection.query('SELECT * FROM champions', (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête SQL :', err);
      res.status(500).send('Erreur du serveur');
    } else {
      res.json(results);
    }
  });
});

// Lancer le serveur
server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
