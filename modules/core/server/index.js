/**
 * Application discpatcher
 */

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// Make the environment-set available.
process.env.NODE_ENV = env;

// Export the application
module.exports = require('./app');