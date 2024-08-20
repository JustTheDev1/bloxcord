const express = require('express');
const app = express();
const port = 3000; // Je kunt elke poort kiezen die je wilt

// Middleware om JSON-requests te parsen
app.use(express.json());

// Lijst van toegestane IP-adressen
const allowedIps = ['123.456.789.0', '98.765.432.1']; // Voeg hier de IP-adressen toe die je wilt toestaan

// Middleware om IP-adressen te controleren
function checkIp(req, res, next) {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // Als clientIp een array is (bijv. als er meerdere proxies zijn), neem de eerste waarde
  const realIp = Array.isArray(clientIp) ? clientIp[0] : clientIp;

  if (allowedIps.includes(realIp)) {
    next(); // IP is toegestaan, ga verder met de request
  } else {
    res.status(403).send('Forbidden'); // IP is niet toegestaan, stuur een forbidden response
  }
}

// Toepassen van de IP-checking middleware op alle routes
app.use(checkIp);

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

// Route voor serverstatus
app.get('/api/status', (req, res) => {
  const status = {
    statusCode: 200,
    message: 'OK',
    description: 'The server is up and running smoothly.'
  };
  res.json(status);
});

// Start de server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

