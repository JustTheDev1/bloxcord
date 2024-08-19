const express = require('express');
const app = express();
const port = 3000; // Je kunt elke poort kiezen die je wilt

// Middleware om JSON-requests te parsen
app.use(express.json());

// Basis route om te testen
app.get('/', (req, res) => {
  res.send('BLOXCORD API SERVICE ACTIVE');
});

// Een voorbeeld van een API endpoint
app.get('/api/agents', (req, res) => {
  const users = [
    { id: 1, name: 'JustTheDev' },
    { id: 2, name: 'JustTheDev1' },
  ];
  res.json(users);
});

// Start de server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
