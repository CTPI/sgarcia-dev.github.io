var gulp = require('gulp'),
	gp = {},
	flag = null;

gp.vinylSourceStream = require('vinyl-source-stream');
gp.babelify = require('babelify');
gp.browserify = require('browserify');
gp.sass = require('gulp-sass');
gp.autoprefixer = require('gulp-autoprefixer');
gp.inlineSource = require('gulp-inline-source');
gp.rename = require('gulp-rename');
gp.gutil = require('gulp-util');
gp.flatten = require('gulp-flatten');
gp.plumber = require('gulp-plumber');
gp.clean = require('gulp-clean');
gp.runSequence = require('run-sequence');
gp.arguments = require('yargs').argv;
gp.cleanCSS = require('gulp-clean-css');
gp.rename = require('gulp-rename');
gp.vinylTransform = require('vinyl-transform');

gulp.task('default', ['dev']);

gulp.task('build', [], function() {
	return gp.runSequence('clean', ['process-css', 'process-js'], 'process-html');
});

gulp.task('dev', function(cb) {
	gp.runSequence('clean', ['process-css-debug', 'process-js-debug'], 'process-html');
	gulp.watch('src/**/*.scss', ['process-css-debug']);
	gulp.watch('src/**/*.html', ['process-html']);
	gulp.watch('src/**/*.js', ['process-js-debug']);
	gp.gutil.log('Gulp Watch service is running!');
	cb();
});

gulp.task('clean', function() {
	return gulp.src('app', {
			read: false
		})
		.pipe(gp.clean({
			force: true
		}));
});

gulp.task('process-css', function() {
	return gulp.src(['src/app.scss', 'src/app.inline.scss'])
		.pipe(gp.plumber())
		.pipe(gp.sass().on('error', gp.sass.logError))
		.pipe(gp.autoprefixer())
		.pipe(gp.cleanCSS())
		.pipe(gp.rename({ suffix: '.min' }))
		.pipe(gulp.dest('./app'));
});

gulp.task('process-css-debug', function() {
	return gulp.src(['src/app.scss', 'src/app.inline.scss'])
		.pipe(gp.plumber())
		.pipe(gp.sass().on('error', gp.sass.logError))
		.pipe(gp.autoprefixer())
		.pipe(gp.rename({ suffix: '.min' }))
		.pipe(gulp.dest('./app'));
});

var browserified = gp.vinylTransform(function(filename) {
	var _browserify = gp.browserify(filename);
	_browserify.transform(gp.babelify)
	return _browserify.bundle();
});

gulp.task('process-js', function() {
	return gulp.src(['src/app.js'])
		.pipe(browserified)
		.on('error', function(error) {
			gp.gutil.log(error);
		})
		.pipe(gulp.dest('./app'));
});

gulp.task('process-js-debug', function() {
	return gp.browserify('src/app.js', {
			debug: true
		})
		.transform(gp.babelify)
		.bundle()
		.on('error', function(error) {
			gp.gutil.log(error);
		})
		.pipe(gp.vinylSourceStream('app.min.js'))
		.pipe(gulp.dest('./app'));
});

gulp.task('process-html', function() {
	gulp.src('src/index.html')
		.pipe(gp.flatten())
		.pipe(gp.inlineSource())
		.pipe(gulp.dest('./'));
	gulp.src('src/**/*-view.html')
		.pipe(gp.flatten())
		.pipe(gulp.dest('./app/views'));
	gulp.src('src/**/*-template.html')
		.pipe(gp.flatten())
		.pipe(gulp.dest('./app/templates'));
});
