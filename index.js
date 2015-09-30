var express = require('express');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src'));

app.get('/', function (req, res) {
  res.render('layout');
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Giga pudding at http://%s:%s', host, port);
});