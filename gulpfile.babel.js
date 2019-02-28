var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var del = require('del');

var sourcemaps   = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var cssmin      = require('gulp-cssnano');
var rename      = require('gulp-rename');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify')

var browserSync = require('browser-sync').create();
 
sass.compiler = require('node-sass');


var onError = function(err) {
  notify.onError({
    title:    "Gulp",
    subtitle: "Failure!",
    message:  "Error: <%= error.message %>",
    sound:    "Basso"
  })(err);
  this.emit('end');
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
    return gulp.src('src/js/**/*')
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