const path = require("path");
const express = require("express");
const moment = require("moment");
const app = express();

// Servir archivos estáticos (CSS, JS, imágenes)
app.use("/public", express.static(path.join(__dirname, "public")));

// RUTA RAÍZ → servir HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Timestamp Microservice
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  let parsedDate;

  if (!date) parsedDate = moment();
  else if (/^\d+$/.test(date)) parsedDate = moment(Number(date));
  else parsedDate = moment(date);

  if (!parsedDate.isValid()) return res.json({ error: "Invalid Date" });

  res.json({
    unix: parsedDate.valueOf(),
    utc: parsedDate.toDate().toUTCString(),
  });
});

module.exports = app;
