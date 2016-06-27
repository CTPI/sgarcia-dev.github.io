var gulp = require('gulp'),
    gp = {};

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

gulp.task('default', ['process-css', 'process-html', 'process-js', 'dev-watch'], function() {

});

gulp.task('build', ['process-css', 'process-html', 'process-js'], function() {

});

gulp.task('clean', function() {
    return gulp.src('app/', {
            read: false
        })
        .pipe(gp.clean());
});

gulp.task('dev-watch', ['process-css', 'process-html', 'process-js'], function(cb) {
    gulp.watch('src/**/*.scss', ['process-css']);
    gulp.watch('src/**/*.html', ['process-html']);
    gulp.watch('src/**/*.js', ['process-js']);
	gp.gutil.log('Gulp Watch service is running!');
	cb();
});

gulp.task('process-css', function() {
    gulp.src('src/**/app.scss')
        .pipe(gp.plumber())
        .pipe(gp.sass().on('error', gp.sass.logError))
        .pipe(gp.autoprefixer())
        .pipe(gulp.dest('./app'));
});

gulp.task('process-js', function() {
    gp.browserify('src/app.js', {
            debug: true
        })
        .transform(gp.babelify)
        .bundle()
        .on('error', function(error) {
            gp.gutil.log(error);
        })
        .pipe(gp.vinylSourceStream('bundle.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('process-html', function() {
    gulp.src('src/**/*-view.html')
        .pipe(gp.flatten())
        .pipe(gulp.dest('./app/views'));
    gulp.src('src/**/*-template.html')
        .pipe(gp.flatten())
        .pipe(gulp.dest('./app/templates'));
});
