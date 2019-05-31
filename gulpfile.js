var gulp         = require('gulp');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
 

function reload(done) {
  browserSync.reload();
  done();
} 

/*
 * generate css from sass
 */
gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('browserSync', gulp.series(function (done) {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
  done();
}));


gulp.task('watch', gulp.series(['browserSync', 'sass'], function () {
  gulp.watch('./src/scss/**/*.scss', gulp.series(['sass']));
  gulp.watch('./src/*.html', gulp.series(reload));
  gulp.watch('./src/js/**/*.js', gulp.series(reload));
}));
