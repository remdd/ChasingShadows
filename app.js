var express 				= require('express'),
	logger					= require('morgan'),
	app 					= express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(logger('dev'));



//	ROUTES	//
app.get('/', function(req, res) {
	res.render('home')
});

app.get('/about', function(req, res) {
	res.render('about')
});



app.listen(3000, process.env.IP, function() {
	console.log("Server started");
});
