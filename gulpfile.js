var gulp = require('gulp');
var util = require('gulp-util');
var browserify = require('browserify');
var babel = require('gulp-babel');
var babelify = require('babelify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var replace = require('gulp-token-replace');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var pkg = require('./package.json');

var version = process.env.ENV ? process.env.ENV.COMMIT_HASH : 'local';

gulp.task('compile:app', function() {
  browserify({ debug: util.env.env === 'local' })
  .external(Object.keys(pkg.dependencies))
  .transform(babelify.configure())
  .require('./app/index.js', { entry: true })
  .bundle()
  .pipe(source('main-' + version + '.js'))
  .pipe(gulp.dest('dist'))
  .pipe(livereload());
});

gulp.task('compile:vendor', function() {
  browserify({ debug: util.env.env === 'local' })
  .require(Object.keys(pkg.dependencies))
  .bundle()
  .pipe(source('vendor-' + version + '.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('copy:static', function() {
  return gulp.src('static/**/*')
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('build:index', function() {
  var config = { version: version };

  return gulp.src(['./build/index.html'])
    .pipe(replace({ global: config }))
    .pipe(gulp.dest('dist'));
});

gulp.task('compile:sass', function() {
  gulp.src('./style/style.scss')
    .pipe(sass({
      includePaths: [
        './node_modules/bootstrap/dist/css',
        './node_modules/react-bootstrap-switch/dist/css/bootstrap3'
      ]
    }).on('error', sass.logError))
    .pipe(rename('style-' + version + '.css'))
    .pipe(gulp.dest('dist'))
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
gulp.task('dev', ['watch']);
gulp.task('build', ['copy:static', 'build:index', 'compile:app', 'compile:vendor', 'compile:sass']);
