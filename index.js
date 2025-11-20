// myApp.js
var express = require('express');
var app = express();

// Root para comprobar que la app corre (opcional)
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// Ruta principal del microservicio
app.get('/api/timestamp/:date_string?', (req, res) => {
  let { date_string } = req.params;

  // Si no hay date_string, usamos la fecha actual
  if (!date_string) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Si la cadena es sólo dígitos, interpretarla como unix (ms)
  // Ej: "1451001600000"
  if (/^\d+$/.test(date_string)) {
    const unixMs = Number(date_string);
    const date = new Date(unixMs);
    if (date.toString() === 'Invalid Date') {
      return res.json({ error: 'Invalid Date' });
    }
    return res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }

  // Intentar parsear como fecha (ISO u otros formatos entendidos por Date)
  const date = new Date(date_string);
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

module.exports = app;
