const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');

function compressimg() {
    return gulp.src('./source/images/*')
        .pipe(imagemin ())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/images'));
};

function compressJS() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
};

function compilaSass() {
    return gulp.src('./source/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

exports.sass = compilaSass;
exports.watch = function () {
    gulp.watch('.source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
}
exports.javascript = compressJS;
exports.imagemin = compressimg;
