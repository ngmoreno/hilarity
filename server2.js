var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 5000;


var sys = require('sys');
var exec = require('child_process').exec;

var server = require('http').createServer(app)
function puts(error, stdout,stderr) { sys.puts(stdout)} 
  
app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

app.post('/say', function(request, response) {
  console.log('say' + request.body.words );
  exec("say " +request.body.words);
});
app.get('say', function(request, response) {
  res.redirect("/index.html");
});
console.log("Simple static server listening at http://" + hostname + ":" + port);
//app.listen(port, hostname);
server.listen(port, function() {
    console.log("Listening on " + port);
});
