// params: gulp instance, gulp plugins, gulp config
module.exports = function(gulp, gp, gc) {
	var bundlers = createBundlers();

	return {
		watchJs: watchJs,
		bundleJs: bundleJs
	};

	function watchJs() {
		bundlers.forEach(function (bundler) {
			bundler.watch()
		});
	}

	function bundleJs() {
		bundlers.forEach(function (bundler) {
			bundler.startBundle()
		});
	}

	function createBundlers() {
		var bundlers = [];
		gc.src.js.forEach(function (src) {
			bundlers.push(createBundler(src));
		});
		return bundlers;
	}

	function createBundler(src) {
		var bundler = gp.browserify(src, {
			cache: {},
			packageCache: {},
			plugin: [gp.watchify]
		}).transform('babelify', {presets: ['es2015']});

		bundler.startBundle = startBundle;
		bundler.watch = watch;

		return bundler;

		function startBundle() {
			bundler.bundle()
				.on('error', gp.gutil.log.bind(gp.gutil, 'Browserify error'))
				.pipe(gp.source('bundle.js'))
				.pipe(gp.buffer())
				.pipe(gulp.dest(gc.dest.main))
				.pipe(gp.connect.reload());
		}

		function watch() {
			bundler.on('update', function() {
				gp.gutil.log('Watchify: Bundling Javascript...');
				bundler.startBundle();
			});
		}
	}
};
