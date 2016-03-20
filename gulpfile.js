var gulp = require('gulp'),
	source = require('vinyl-source-stream'),
	browserify = require('browserify'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	gutil = require('gulp-util'),
	flatten = require('gulp-flatten'),
	plumber = require('gulp-plumber');

gulp.task('default', ['sass', 'html', 'js', 'dev-watch'], function () {
	return gutil.log('Gulp Watch service is running!');
});

gulp.task('dev-watch', ['sass', 'html', 'js'], function() {
	gulp.watch('src/**/*.scss', ['sass']);
	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/**/*.js', ['js'])
});

gulp.task('sass', function() {
	gulp.src('src/**/app.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./'));
});

gulp.task('js', function() {
	browserify('src/app.js')
		.bundle()
		.on('error', function(error) {
			gutil.log(error);
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('html', function() {
	gulp.src('src/**/index.html')
		.pipe(flatten())
		.pipe(gulp.dest('./'));
	gulp.src('src/**/*-view.html')
		.pipe(flatten())
		.pipe(gulp.dest('./views'));
	gulp.src('src/**/*-template.html')
		.pipe(flatten())
		.pipe(gulp.dest('./templates'));
});