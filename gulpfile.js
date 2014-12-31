var gulp = require("gulp");
var gulp_sass = require("gulp-ruby-sass");
var gulp_autoprefixer = require("gulp-autoprefixer");
var gulp_ghpages = require("gulp-gh-pages");

var browserify = require("browserify");
var reactify = require("reactify");
var aliasify = require("aliasify");
var stream = require("vinyl-source-stream");

gulp.task("markup", function() {
    var glob = "./project/index.html";
    return gulp.src(glob)
               .pipe(gulp.dest("./reproject/"))
});

gulp.task("styles", function() {
    var SASS_OPTIONS = {style: "compressed", quiet: true, "sourcemap=none": true}
    var AUTOPREFIXER_OPTIONS = "last 2 version"
    
    return gulp.src("./project/index.scss")
               .pipe(gulp_sass(SASS_OPTIONS))
               .pipe(gulp_autoprefixer(AUTOPREFIXER_OPTIONS))
               .pipe(gulp.dest("./reproject/"))
});

gulp.task("scripts", function() {
    return browserify("./project/index.js")
               .transform("reactify")
               .transform(aliasify.configure({
                    aliases: {
                        "<root>": __dirname + "/project"
                    },
                    configDir: __dirname,
                    verbose: false
                }))
               .bundle()
               .pipe(stream("index.js"))
               .pipe(gulp.dest("./reproject/"))
});

gulp.task("assets", function() {
    return gulp.src("./project/assets/**/*")
               .pipe(gulp.dest("./reproject/assets/"))
});

gulp.task("default", function() {
    gulp.start("markup", "styles", "scripts", "assets");
});
