'use strict';

var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream') //TODO: find out what is this, but needed to do the transform :S

gulp.task('build', function () {
    return browserify({
        entries: [ './src/js/index.js' ],
        extensions: [ '.js' ],
        debug: false // Add sourcemaps
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/'));
})

gulp.task('watch', function () {
    gulp.watch(['src/js/**/*.js'], ['build']);
});

gulp.task('default', ['build', 'watch']);