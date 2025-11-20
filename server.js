// server.js
var app = require('./index'); // o './server' según tu nombre de archivo
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
