'use strict';

var gulp = require('gulp'),
  concatCSS = require('gulp-concat-css'),
  notify = require("gulp-notify"),
  jshint = require('gulp-jshint'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create(),
  minifyCSS = require('gulp-minify-css'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  concat = require("gulp-concat"),
  sourcemaps = require('gulp-sourcemaps'),
  tiny = require('gulp-tinypng-nokey'),
  include = require('gulp-html-tag-include'),
  svgSprite = require('gulp-svg-sprite'),
  browserSyncReuseTab = require('browser-sync-reuse-tab')(browserSync),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replaceString = require('gulp-replace'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename');
// paths
//-----------------------------------------------------------------------------------
var paths = {
  templates: "dev/templates/",
  sass: "dev/sass/",
  css: "css/",
  fonts: "css/fonts/",
  js: "js/",
  chunks: "dev/chunks/",
  jsDev: "dev/js/"
};

// browser-sync
//-----------------------------------------------------------------------------------
gulp.task('browser-sync', function () {
  browserSync.init({
    notify: false,
    logFileChanges: false,
    port: 8080,
    server: {
      baseDir: ""
    }
  }, browserSyncReuseTab /* enabled if OS X > 10.10 */);
});

// svg sptrite
//-----------------------------------------------------------------------------------
gulp.task('svg-sprite', function () {
  return gulp.src('img/svg-source/*.svg')

  // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove attr
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
        $('[xmlns]').removeAttr('xmlns');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(replaceString('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg",
          render: {
            sass: {
              dest: '../../dev/sass/standards/icon_default.sass',
              template: paths.sass + 'standards/icon_template.sass'
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('img/'));
});


// Chunks
//-----------------------------------------------------------------------------------
gulp.task('html-include', function () {
  return gulp.src(paths.templates + '*.html')
    .pipe(include())
    .pipe(gulp.dest(''))
    .pipe(browserSync.stream());
});


// Работа с CSS
//-----------------------------------------------------------------------------------
gulp.task('css', function () {
  return gulp.src(paths.css + 'plugins/*.css')
    .pipe(autoprefixer('last 3 versions'))
    .pipe(minifyCSS(''))
    .pipe(concatCSS('libs.css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});


// Работа с SASS
//-----------------------------------------------------------------------------------
gulp.task('sass', function () {
  return gulp.src(paths.sass + 'style.sass')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(sourcemaps.write('.'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream())
    .pipe(notify({
      title: 'Task Complete',
      message: 'Development task finished running',
      wait: true,
      onLast: true
    }));
});

// Работа с JS
//-----------------------------------------------------------------------------------
gulp.task('js-libs', function () {
  return gulp.src([
    paths.jsDev + 'lib/jquery.min.js',
    paths.jsDev + 'lib/*.js'
  ])
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat('libs.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.js))
    .pipe(browserSync.stream());
});

gulp.task('js-core', function () {
  return gulp.src(paths.jsDev + 'core/*.js')
    .pipe(jshint())
    //.pipe(uglify())
    .pipe(concat('core.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(browserSync.stream());
});

// Смотрим за изминением
//-----------------------------------------------------------------------------------
gulp.task('watch', function () {
  gulp.watch(paths.templates + '*.html', ['html-include']);
  gulp.watch(paths.chunks + '*.html', ['html-include']);
  gulp.watch(paths.sass + '**/*.sass', ['sass']);
  gulp.watch(paths.jsDev + 'lib/*.js', ['js-libs']);
  gulp.watch(paths.jsDev + 'core/*.js', ['js-core']);
  gulp.watch(paths.css + 'plugins/*.css', ['css']);
  gulp.watch('img/svg-source/*.svg', ['svg-sprite']);
});


// production task
//-----------------------------------------------------------------------------------
gulp.task('copy-css', function () {
  return gulp.src(paths.css + 'plugins/*.css')
    .pipe(autoprefixer('last 3 versions'))
    .pipe(minifyCSS(''))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(concatCSS('libs.css'))
    .pipe(gulp.dest('production/css'));
});

gulp.task('copy-sass', function () {
  return gulp.src(paths.sass + 'style.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(minifyCSS(''))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('production/css'));
});

gulp.task('copy-fonts', function () {
  gulp.src(paths.fonts + '**/*')
    .pipe(gulp.dest('production/css/fonts'));
});

gulp.task('copy-libs-js', function () {
  return gulp.src([
    paths.jsDev + 'lib/jquery.min.js',
    paths.jsDev + 'lib/*.js'
  ])
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat('libs.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('production/js'));
});

gulp.task('copy-core-js', function () {
  return gulp.src(paths.jsDev + 'core/*.js')
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat('core.js'))
    .pipe(gulp.dest('production/js'));
});

gulp.task('copy-img', function (cb) {
  gulp.src('img/**/*')
    .pipe(tiny())
    .pipe(gulp.dest('production/img')).on('end', cb).on('error', cb);
});

gulp.task('copy-html', function () {
  return gulp.src(paths.templates + '*.html')
    .pipe(include())
    .pipe(gulp.dest('production/'));
});

// gulp
//-----------------------------------------------------------------------------------
gulp.task('default', ['html-include', 'sass', 'css', 'js-libs', 'js-core', 'svg-sprite', 'browser-sync', 'watch']);

// gulp production
//-----------------------------------------------------------------------------------
gulp.task('production', ['copy-css', 'copy-sass', 'copy-fonts', 'copy-libs-js', 'copy-core-js', 'copy-img', 'copy-html']);
