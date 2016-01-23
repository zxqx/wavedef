var gulp = require('gulp');
var browserify = require('browserify');
var babel = require('gulp-babel');
var babelify = require('babelify');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');

gulp.task('compile:example', function() {
  browserify({ debug: true })
  .transform(babelify.configure())
  .require('./examples/main.js', { entry: true })
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('dist'))
  .pipe(livereload());
});

gulp.task('copy:static', function() {
  return gulp.src('static/**/*')
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('compile:sass', function() {
  gulp.src('./style/**/*.scss')
    .pipe(sass({
      includePaths: ['./node_modules/foundation/scss']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('static/**/*', ['copy:static']);
  gulp.watch('lib/**/*.js', ['compile:example']);
  gulp.watch('examples/**/*.js', ['compile:example']);
  gulp.watch('./style/**/*.scss', ['compile:sass']);
});

gulp.task('default', ['build']);
gulp.task('dev', ['build', 'watch']);
gulp.task('build', ['copy:static', 'compile:example', 'compile:sass']);
