var express 				= require('express'),
	logger					= require('morgan'),
	app 					= express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(logger('dev'));

var mainTheme;

dotenv.config({path: '.env'});				//	Loads environment variables file

//	ROUTES	//
app.get('/', function(req, res) {
	mainTheme = true;
	res.render('index', {mainTheme: mainTheme});
});

app.get('/music', function(req, res) {
	mainTheme = false;
	res.render('index', {mainTheme: mainTheme});
});

app.get('/about', function(req, res) {
	res.render('about');
});


app.listen(process.env.PORT, process.env.IP, function() {
	console.log("Server started");
});
