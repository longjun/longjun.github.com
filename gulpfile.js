var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssshrink = require('gulp-cssshrink'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin');

gulp.task('js', function(){
    gulp.src('./assets/js/*.js')
        .pipe(concat('application.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Javascript task complete' }));
});

gulp.task('css', function(){
    gulp.src('assets/css/*.css')
        .pipe(concat('application.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssshrink())
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload())
        .pipe(notify({ message: 'Stylesheets task complete' }));
});

gulp.task('stylus', function(){
    gulp.src('assets/stylus/style.styl')
        .pipe(stylus())
        .pipe(gulp.dest('assets/css/'))
        .pipe(notify({ message: 'Stylus task complete' }));
});

gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('default', function(){
    gulp.run('js', 'css');
    gulp.watch('assets/stylus/*.styl', ['stylus']);
    gulp.watch('assets/css/*.css', ['css']);
    gulp.watch('assets/js/*.js', ['js']);
});
