var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');


// Create the application.
var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));


// Open API to the world: CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Connect to MongoDB
var mongoOptions = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  //user: 'myUserName',
  //pass: 'myPassword'
}
mongoose.Promise = global.Promise; // https://github.com/Automattic/mongoose/issues/4291
mongoose.connect('mongodb://localhost:27017/meanapp', mongoOptions, function(err){
// mongoose.Promise = global.Promise; // https://github.com/Automattic/mongoose/issues/4291
// mongoose.connection.once('open', function() {

	if(err) {
		throw err; 
	}

	// Load the models.
  	app.models = require('./models/index');

  	// Register the routes
  	var routes = require('./routes');
  	_.each(routes, function(controller, route){

  		console.log(`ROUTE ${route}`);

  		app.use(route, controller(app, route));
  	});

	console.log('Meanapp listening on port 3000...');
  	
	// Start the App!
  	app.listen(3000);

});