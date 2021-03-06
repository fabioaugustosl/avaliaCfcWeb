var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');


var useref = require('gulp-useref');
var minifyCss = require('gulp-minify-css');
var gulpif = require('gulp-if');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');



var jsFiles = ['*.js','public/js/**/*.js']; 


gulp.task('style', function(){
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish',{
			verbose: true
		}));
});

gulp.task('inject',function(){
	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');

	var injectSrc = gulp.src(['./public/css/*.css',
							  './public/js-lib/*.js',
							  './public/js/*.js',
							  './public/js/services/*.js',
							  './public/js/controllers/*.js',
							  './public/js/**/*.js'],{read:false});

	var injectOptions = {ignorePath: '/public'};

	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		ignorePath: '..'
	};

	return gulp.src('./public/view/*.html')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./public/view'));
});

gulp.task('default', ['style','inject'], function(){
	var options = {
		script: 'scripts/web-server.js',
		delayTime: 1,
		env: {
			'PORT' : 8000
		},
		watch: jsFiles
	};
	return nodemon(options)
				.on('restart', function(ev){
					console.log('Restarting...');
				});
});



// BUILD
gulp.task('copy-files', function () {
    var stream =  gulp.src('./public/**/*') // stream source
        .pipe(gulp.dest('./dist')); // copy to dist/views
    return stream;
});


gulp.task('copy-index', function () {
	return gulp.src('./public/view/index.html')
		.pipe(gulp.dest('./dist'));

});



gulp.task('build', function (callback) {
    runSequence(
    	'inject',
        'copy-files',
        'copy-index',
        /* other tasks maybe */
    callback);
});

