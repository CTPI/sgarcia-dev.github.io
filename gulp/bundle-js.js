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
		var bundlersPromises = bundlers.map(bundler => {
			return bundler.startBundle();
		});

		Promise.all(bundlersPromises)
			.then(handlerAfterAllBundlesHaveFinished,() => {
				//TODO: Handle the rejected promise
			})
	}

	function handlerAfterAllBundlesHaveFinished(){
		//TODO: Logic to perform after all the bundlers have finished
		gp.gutil.log.call(gp.gutil, 'all Bundlers have finished!');
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
			return new Promise(function(resolve, reject){
				bundler.bundle()
					.on('error', () => {
						gp.gutil.log.call(gp.gutil, 'Browserify error');
						reject();
					})
					.on('end', () => {
						gp.gutil.log.call(gp.gutil, 'Browserify Process Ended');
						resolve();
					})
					.pipe(gp.source('bundle.js'))
					.pipe(gp.buffer())
					.pipe(gulp.dest(gc.dest.main))
					.pipe(gp.connect.reload());
			});
		}

		function watch() {
			bundler.on('update', function() {
				gp.gutil.log('Watchify: Bundling Javascript...');
				bundleJs();
			});
		}
	}
};
