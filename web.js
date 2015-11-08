// Heroku specific configuration
var app_port = (process.env.PORT || 5000);

// Main applciation start
var express = require('express');
var app = express();

// The folder to server static files from is "./public"
app.use(express.static('public'));

// Allow ejs to render html files as well
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
	  res.render('login.html', {} );
});

var server = app.listen(app_port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

