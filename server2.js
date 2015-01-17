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
  var to_say = request.body.words;
  console.log(to_say + " length is " + to_say.length);
  if (to_say.length == 0){
    to_say = "lol";
  }
  var voices = ['Deranged', 'Trinoids', 'Bahh', 'Bubbles', 'Bruce', 'Victoria', 'Vicki', 'Princess', 'Agnes', 'Kathy', 'Fred', 'Ralph', 'Hysterical' ]
  var random = Math.floor((Math.random() * ((voices.length + 1) - 0)) + 0);
 
  exec("say -v " + voices[random] +" " +to_say);
  response.redirect('/');
});
console.log("Simple static server listening at http://" + hostname + ":" + port);
//app.listen(port, hostname);
server.listen(port, function() {
    console.log("Listening on " + port);
});
