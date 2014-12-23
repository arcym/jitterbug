var gulp = require("gulp");
var gulp_sass = require("gulp-sass");
var gulp_autoprefixer = require("gulp-autoprefixer");
var gulp_ghpages = require("gulp-gh-pages");

var reactify = require("reactify");
var browserify = require("browserify");
var stream = require("vinyl-source-stream");

gulp.task("markup", function() {
    var glob = "./source/index.html";
    return gulp.src(glob)
               .pipe(gulp.dest("./fisource/"))
});

gulp.task("styles", function() {
    var glob = "./source/index.scss";
    return gulp.src(glob)
               .pipe(gulp_sass())
               .pipe(gulp_autoprefixer())
               .pipe(gulp.dest("./fisource/"))
});

gulp.task("scripts", function() {
    var glob = "./source/index.js";
    return browserify(glob)
               .transform("reactify").bundle()
               .pipe(stream("index.js"))
               .pipe(gulp.dest("./fisource/"))
});

gulp.task("default", function() {
    gulp.start("markup", "styles", "scripts");
});

gulp.task("deploy", function() {
    var glob = "./fisource/";
    return gulp.src(glob)
               .pipe(gulp_ghpages())
});
