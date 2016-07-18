// params: gulp instance, gulp plugins, gulp config
module.exports = function(gulp, gp, gc) {
	var bundlers = createBundlers();
	return {
		watchCss: watchCss,
		bundleCss: bundleCss
	};

	function watchCss() {
		bundlers.forEach(function (bundler) {
			bundler.watch();
		});
	}

	function bundleCss() {
		bundlers.forEach(function (bundler) {
			bundler.start();
		});
	}

	function createBundlers() {
		var bundlers = [];
		gc.src.css.forEach(function(src) {
			bundlers.push(createBundler(src));
		});
		return bundlers;
	}

	function createBundler(src) {
		var bundler = {};
		bundler.start = start;
		bundler.watch = watch;
		return bundler;

		function start() {
			gulp.src(src)
				.pipe(gp.stylus())
				.pipe(gp.rename('bundle.css'))
				.pipe(gulp.dest(gc.dest.main))
				.pipe(gp.connect.reload());
		}

		function watch() {
			gulp.watch([src], ['bundle-css']);
		}
	}
};
