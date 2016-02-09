var gulp = require('gulp');
var browserify = require('browserify');
var babel = require('gulp-babel');
var babelify = require('babelify');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');

gulp.task('compile:app', function() {
  browserify({ debug: true })
  .transform(babelify.configure())
  .require('./app/index.js', { entry: true })
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
      includePaths: [
        './node_modules/bootstrap/dist/css',
        './node_modules/react-bootstrap-switch/dist/css/bootstrap3'
      ]
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('lint', function() {
  return gulp.src(['lib/**/*.js','examples/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('static/**/*', ['copy:static']);
  gulp.watch('lib/**/*.js', ['lint', 'compile:app']);
  gulp.watch('app/**/*.js', ['lint', 'compile:app']);
  gulp.watch('./style/**/*.scss', ['compile:sass']);
});

gulp.task('default', ['build']);
gulp.task('dev', ['build', 'watch']);
gulp.task('build', ['copy:static', 'compile:app', 'compile:sass']);
