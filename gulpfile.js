var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var rename = require('gulp-rename')
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');

gulp.task('minify-js', function() {
    return gulp.src('src/index.js')
        .pipe(gulpIf('*.js', uglify()))
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('dist/js/'))
});

gulp.task('minify-css', function() {
    return gulp.src('src/css/style.css')
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css/'))
});

gulp.task('minify-html', function() {
    return gulp.src('src/index.html')
        .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(rename('index.min.html'))
        .pipe(gulp.dest('dist/'))
});


gulp.task('watch', function() {
    gulp.watch('src/index.js', ['minify-js']);
    gulp.watch('src/css/style.css', ['minify-css']);
    gulp.watch('src/index.html', ['minify-html']);
});