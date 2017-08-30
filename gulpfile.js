const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      p = require('gulp-load-plugins')();

const SRC = 'src',
      DEST = 'public_html';

function plumberNotify(){
  return p.plumber({
    errorHandler: p.notify.onError("<%= error.message %>")
  });
}

//sass
gulp.task('sass', function () {
  return gulp.src([
    `${SRC}/**/*.scss`,
    `!${SRC}/**/_*.scss`
  ],{
    base: SRC
  })
  .pipe(p.using())
  .pipe(plumberNotify())
  // .pipe(p.sourcemaps.init())
  .pipe(p.sass({outputStyle: 'expanded'}).on('error', p.sass.logError))
  .pipe(p.autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  // .pipe(p.sourcemaps.write(DEST))
  .pipe(gulp.dest(DEST));
});

//copy
gulp.task('copy', function(){
  return gulp.src([
   `${SRC}/**/*`,
    `!${SRC}/**/*.scss`
  ])
  .pipe(gulp.dest(DEST))
});

//server
gulp.task('server', function(){
  browserSync.init({
    server: {
      baseDir: DEST,
      index: 'index.html'
    }
  });
});

gulp.task('watch', ['copy','sass'], function () {
  gulp.watch([`${SRC}/**/*.html`,`${SRC}/**/*.js`], ['copy', browserSync.reload]);
  gulp.watch([`${SRC}/**/*.scss`], ['sass', browserSync.reload]);
})

gulp.task('default', ['server', 'watch']);
