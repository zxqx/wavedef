var gulp = require('gulp');
var browserify = require('browserify');
var babel = require('gulp-babel');
var babelify = require('babelify');
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
  return gulp.src('examples/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('examples/**/*', ['copy:static']);
  gulp.watch('lib/**/*.js', ['compile:example']);
  gulp.watch('examples/**/*.js', ['compile:example']);
});

gulp.task('default', ['client']);
gulp.task('dev', ['client', 'watch']);
gulp.task('client', ['copy:static', 'compile:example']);
