/**
 * Connection to mongoDB using mongoose
 */

'use strict';

// Require Mongoose
var mongoose = require('mongoose');

// DB Config
// Environment set from the dispatcher (index.js)
var configDB = require(`../config/env/${process.env.NODE_ENV}/database.js`);

//mongoose.Promise = global.Promise; // https://github.com/Automattic/mongoose/issues/4291
var dbconnectURL = `mongodb://${configDB.host}:${configDB.port}/${configDB.databaseName}`;
mongoose.connect(dbconnectURL, configDB.options, function(err) {
	if(err) {
		throw err;
	}
	console.log(`Connected to the database ${dbconnectURL}`);
});

module.exports = mongoose;