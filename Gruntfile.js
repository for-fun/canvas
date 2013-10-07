var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
	var config = {
		path: 'app',
		liveReloadPort: 35729
	};
	
	require('load-grunt-tasks')(grunt);

	require('connect-livereload')({
		port: config.liveReloadPort
	});

	grunt.initConfig({
		conf: config,
		watch: {
			sass: {
				files: [
					'<%= conf.path %>/**/sass/*.sass',
					'<%= conf.path %>/**/sass/*.scss'
				],
				tasks: ['compass:dev']
			},
			livereload: {
				files: [
					'<%= conf.path %>/**/sass/*.sass',
					'<%= conf.path %>/**/sass/*.scss',
					'<%= conf.path %>/**/*.html',
					'<%= conf.path %>/**/scripts/*.js'
				],
				options: {
					livereload: config.liveReloadPort
				}
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: '<%= conf.path %>/2/sass',
					cssDir: '<%= conf.path %>/2/assets/css',
					imagesDir: '<%= conf.path %>/2/assets/images',
					relativeAssets: true,
					outputStyle: 'expanded'
				}
			}
		},

		connect: {
			options: {
				port: 5555,
				base: config.path,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							require('connect-livereload')(),
							mountFolder(connect, config.path)
						];
					}
				}
			}
		},
		open: {
			server: {
				url: 'http://localhost:<%= connect.options.port %>/2/1.html'
			}
		}
	});

	grunt.registerTask('default', [
		'connect',
		'open',
		'watch'
	]);

	grunt.loadNpmTasks('grunt-open');
};