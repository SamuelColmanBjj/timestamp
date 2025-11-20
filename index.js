// myApp.js
const express = require("express");
const app = express();

// Timestamp Microservice
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  let parsedDate;

  if (!date) {
    // Sin parámetro → fecha actual
    parsedDate = new Date();
  } else if (/^\d+$/.test(date)) {
    // Solo dígitos → interpretamos como milisegundos
    parsedDate = new Date(parseInt(date));
  } else {
    // Fecha en string ISO
    parsedDate = new Date(date);
  }

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

module.exports = app;
