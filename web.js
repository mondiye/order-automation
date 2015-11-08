// Heroku specific configuration
var app_port = (process.env.PORT || 5000);

// Main applciation start
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var app = express();

// http://stackoverflow.com/questions/5710358/how-to-get-post-a-query-in-express-js-node-js
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	  extended: true
}));

// For session maintanence
app.use(cookieParser());
app.use(session({secret: 'mondiyefreelancer02'}));

// The folder to server static files from is "./public"
app.use(express.static('public'));

// Allow ejs to render html files as well
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	var sess=req.session;
	if(!sess.user_id) {
		res.send("<META http-equiv='refresh' content='0;URL=/login'>");
		return
	}

	var userid = sess.user_id;
	res.render('home.html', {userid: userid});
});

// Handle login
app.get('/login', function(req,res) {
	res.render('login.html',{err: false});
});

app.post('/login', function(req,res) {
	var username = req.body.username;
	var password = req.body.password;
	
	req.session.user_id = 10;
	res.redirect('/');
});

// Handle logout
app.get('/logout',function(req,res) {
	req.session.destroy(function(err){
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});

var server = app.listen(app_port, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

