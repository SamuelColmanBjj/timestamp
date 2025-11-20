// myApp.js
const express = require("express");
const moment = require("moment");
const app = express();

// Timestamp Microservice route
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  // Si no hay parámetro → fecha actual
  if (!date) {
    const now = moment();
    return res.json({
      unix: now.valueOf(),        // milisegundos
      utc: now.toDate().toUTCString()
    });
  }

  let parsedDate;

  // Solo dígitos → interpretar como Unix timestamp (milisegundos)
  if (/^\d+$/.test(date)) {
    parsedDate = moment(Number(date));
  } else {
    // Fecha en string ISO
    parsedDate = moment(date);
  }

  // Fecha inválida
  if (!parsedDate.isValid()) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.valueOf(),
    utc: parsedDate.toDate().toUTCString()
  });
});

module.exports = app;
