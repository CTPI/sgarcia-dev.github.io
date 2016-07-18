var gulp = require('gulp'),
	gulpConfig = require('./gulp-config.json'),
	gulpPlugin = {
		stylus: require('gulp-stylus'),
		rename: require('gulp-rename'),
		concat: require('gulp-concat'),
		inject: require('gulp-inject'),
		flatten: require('gulp-flatten'),
		source: require('vinyl-source-stream'),
		buffer: require('vinyl-buffer'),
		browserify: require('browserify'),
		watchify: require('watchify'),
		babelify: require('babelify'),
		livereload: require('gulp-livereload'),
		gutil: require('gulp-util'),
		connect: require('gulp-connect')
	},
	gulpTasks = {
		css: require('./gulp/bundle-css')(gulp, gulpPlugin, gulpConfig),
		js: require('./gulp/bundle-js')(gulp, gulpPlugin, gulpConfig),
		html: require('./gulp/bundle-html')(gulp, gulpPlugin, gulpConfig)
	},
	path = require('path');

gulp.task('default', [
	'bundle-js',
	'bundle-css',
	'bundle-html',
	'watch-js',
	'watch-css',
	'watch-html',
	'serve'
]);

gulp.task('serve', function () {
	gulpPlugin.connect.server({
		root: 'public',
		livereload: true
	});
});

gulp.task('watch-css', gulpTasks.css.watchCss);

gulp.task('bundle-css', gulpTasks.css.bundleCss);

gulp.task('watch-html', gulpTasks.html.bundleHtml);

gulp.task('bundle-html', gulpTasks.html.bundleHtml);

gulp.task('watch-js', gulpTasks.js.watchJs);

gulp.task('bundle-js', gulpTasks.js.bundleJs);
