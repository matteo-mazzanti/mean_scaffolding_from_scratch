module.exports = function(grunt) {

	// init configuration
	grunt.initConfig({
		jshint: {
			files: ["*.js", "lib/*.js", "test/*.js"],
			options: {
				esnext: true,
				globals: {
					jQuery: true
				}
			}
		},
		watch:{
			scripts:{
				files: ["./*.js"],
				tasks: ["jshint"],
			}
		}
	});


	// Load task "jshint"
	grunt.loadNpmTasks("grunt-contrib-jshint");
	// Load task "watch"
	grunt.loadNpmTasks("grunt-contrib-watch");
	
	// Register task "jshint"
	grunt.registerTask("default", ["jshint"]);
};