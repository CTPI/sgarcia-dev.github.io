// params: gulp instance, gulp plugins, gulp config
module.exports = function(gulp, gp, gc) {
	return {
		watchHtml: watchHtml,
		bundleHtml: bundleHtml
	};

	function watchHtml() {
		gulp.watch([ './app/**/*.html'], ['bundle-html'])
	}

	function bundleHtml() {
		var dependencies = gc.dependencies.js.concat(gc.dependencies.css);

		gulp.src(['./app/index.html'])
			.pipe(gp.inject(
				gulp.src(dependencies, { read: false }),
				{ ignorePath: '/public' }
			))
			.pipe(gulp.dest(gc.dest.main))
			.pipe(gp.connect.reload());

		gulp.src(['./app/**/*-template.html'])
			.pipe(gp.flatten())
			.pipe(gulp.dest('./public/templates'));
	}
};
