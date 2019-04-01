var gulp = require('gulp');
var sass = require('gulp-sass');

var sourcemaps   = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var cssmin      = require('gulp-cssnano');
var rename      = require('gulp-rename');
var plumber     = require('gulp-plumber');
const webpack = require('webpack-stream');
var browserSync = require('browser-sync').create();
 
sass.compiler = require('node-sass');


var onError = function(err) {
  console.log(err);
};


gulp.task('fonts', function () {
	return gulp.src('src/fonts/*')
	  .pipe(gulp.dest('build/fonts'));
});



gulp.task('sass', function () {
	return gulp.src('src/sass/*.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(prefix('last 2 versions'))
		.pipe(cssmin())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'));
});



gulp.task('scripts', function(cb) {
    return gulp.src('src/js/*/*')
		.pipe(webpack(require('./webpack.config.js') ))
		.pipe(gulp.dest('build/js'))
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build/'));
})

gulp.task('images', function() {
    return gulp.src('src/images/**')
        .pipe(gulp.dest('build/images'));
})
gulp.task('videos', function() {
    return gulp.src('src/videos/**')
        .pipe(gulp.dest('build/videos'));
})

gulp.task('watch', function(cb) {
	gulp.watch(['src/*.+(htm|html)', 'src/sass/*.+(scss|sass)', 'src/js/**', 'src/images/**', 'src/videos/**', 'src/index.js'], gulp.series('build'));
	
	browserSync.init({
		server: {
			baseDir: 'build'
		}
	});
	gulp.watch(['build/**', '!build/**/*.css']).on('change', browserSync.reload);
});



gulp.task('build', gulp.series('scripts', 'sass', 'fonts', 'images', 'videos', 'html'), function(cb) {
	cb();
});

gulp.task('default', gulp.series('build', 'watch'), function(cb) {
    cb();
});