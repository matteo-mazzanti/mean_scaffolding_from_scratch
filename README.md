# MEANJS-like scaffolding procedure project #

This project is about an **incremental scaffolding procedure** of MEAN-stack based projects.   
Going through this procedure will help you to scaffold a MEAN application from scratch.
Doing so, you will learn, not only to use, but to become an expert in the technologies behind the MEAN-stack development.
The procedure is modular, meant to "keep it simple", allowing the developer to add components only when necessary.

Suggestions were taken from:
* http://www.bossable.com/954/version-0-4-0/
* http://meanjs.org/docs.html#folders
* http://stackoverflow.com/questions/32152248/folder-structure-for-mean-stack

**Features:**
* Best practice approach for Filesystem:  
 * Modularized approach (core application as module in modules/ folder)
 * Configuration loaded by environments (server/config/env/<environments> folders)
* Database connection available to the application using file encapsulation (using require directive, so the main applicaiton file is kept clean)  
(the database connection is enabled by including in the main application the modules/core/server/include/dbConnect.js file)

**Run the application:**  
* In "development mode":  
$ npm run dev

## Project Initialization

In project's folder:

* $ npm init
 * set modules/core/server/index.js as application entry point 
* $ mkdir config/env/development
* $ mkdir public  
(This folder contains all the static front-end files used by the app to be served out. It includes elements built from your application's source as well as third-party external libraries required by your application.)
* $ mkdir public/lib  
(External libraries used by your application and introduced by Bower will be placed here.)
* $ mkdir public/dist  
(Final application files that you build ready for use will be placed here. For example, this will be the destination for minified scripts for use in production.)
* $ mkdir modules/core/server
* $ mkdir modules/core/client


## Install server's dependencies

* $ npm install --save express
* $ npm install --save mongoose
* $ npm install --save resourcejs
* $ npm install --save method-override
* $ npm install --save body-parser
* $ npm install --save lodash


## Init server application

* $ touch modules/core/server/index.js.  
It will be the application dispatcher.
* $ touch modules/core/server/app.js.  
It will be the application main file.


## Database Access Layer (DAL)

### DAL Configuration

* $ touch modules/core/server/config/env/development/database.js  
Database configuration example in docs/config_database_example.js


### DAL Connection

* touch modules/core/server/include/dbConnect.js
 * It will make the connection to mongo through mongoose. An example can be found in docs/dbConnect_example.js


## Basic server

* Write a basic express server, as in the example: docs/basic_express_server_02(donfigDB).js


### Test the Basic server
* $ node modules/core/server/index.js  
it should write in log: 
 * Listening on port 3000...
 * Connected to the database on host: '<your-host>' port: '27017', db-name: '<yourDB>'


## Development automation with NPM and Grunt

* $ npm install --save-dev grunt  
(Automation tool)
* $ npm install --save-dev grunt-contrib-jshint  
(javascript syntax checker)
* $ npm install --save-dev grunt-contrib-watch  
(restart the server when on code changes)
* $ touch gruntfile.js  
(an example can be found in docs/gruntfile_01.js)  
* modify the package.json in the "script" section. Example provided in docs/package_01.js
Start the server (in "watch mode" - while keep checking the code):
* $ npm run dev  
You can apply changes and the changes will be inmediately reflected.


## Create the models

* $ mkdir models
* $ touch models/<model_name>.js  
(Model example in docs/model_example_Movie.js)
* $ touch models/requireModels.js  
(Require models example in docs/requireModels.js)

## --









