var gulp = require('gulp'); 
var postcss = require('gulp-postcss'); 
var sass = require('gulp-sass'); 

var autoprefixer = require('autoprefixer'); 
var cssnano = require('cssnano');

//Sass-Css-postCss
gulp.task('css', function () {
    var processors = [ autoprefixer, cssnano ];
    return gulp.src('./src/components/**.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'));
});

//生产环境 通过webpack extCss插件将css单独抽离再进行css-压缩，合并，混淆

