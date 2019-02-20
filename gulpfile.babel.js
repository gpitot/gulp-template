var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var del = require('del');

var browserSync = require('browser-sync').create();
 
sass.compiler = require('node-sass');
 


gulp.task('fonts', function () {
	return gulp.src('src/fonts/*')
	  .pipe(gulp.dest('build/fonts'));
  });

gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function(cb) {
    return gulp.src('src/js/*/*')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest('build/js'))
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build/'));
})

gulp.task('images', function() {
    return gulp.src('src/images/*/*')
        .pipe(gulp.dest('build/images'));
})


gulp.task('watch', function(cb) {
	gulp.watch(['src/*.+(htm|html)', 'src/sass/*.+(scss|sass)', 'src/js/*/*'], gulp.series('scripts', 'sass', 'fonts', 'images', 'html'));
	
	browserSync.init({
		server: {
			baseDir: 'build'
		}
	});
	gulp.watch(['build/**', '!build/**/*.css']).on('change', browserSync.reload);
});




gulp.task('clean', function() {
	return del('build');
});

gulp.task('build', gulp.series('clean', 'scripts', 'sass', 'fonts', 'images', 'html'), function(cb) {
	cb();
});

gulp.task('default', gulp.series('build', 'watch'), function(cb) {
    cb();
});