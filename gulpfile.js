var gulp = require("gulp");
var gulp_sass = require("gulp-ruby-sass");
var gulp_autoprefixer = require("gulp-autoprefixer");
var gulp_ghpages = require("gulp-gh-pages");

var browserify = require("browserify");
var reactify = require("reactify");
var aliasify = require("aliasify");
var stream = require("vinyl-source-stream");

gulp.task("markup", function() {
    var glob = "./source/index.html";
    return gulp.src(glob)
               .pipe(gulp.dest("./fisource/"))
});

gulp.task("styles", function() {
    var SASS_OPTIONS = {style: "compressed", quiet: true, "sourcemap=none": true}
    var AUTOPREFIXER_OPTIONS = "last 2 version"
    
    return gulp.src("./source/index.scss")
               .pipe(gulp_sass(SASS_OPTIONS))
               .pipe(gulp_autoprefixer(AUTOPREFIXER_OPTIONS))
               .pipe(gulp.dest("./fisource/"))
});

gulp.task("scripts", function() {
    return browserify("./source/index.js")
               .transform("reactify")
               .transform(aliasify.configure({
                    aliases: {
                        "<root>": __dirname + "/source"
                    },
                    configDir: __dirname,
                    verbose: false
                }))
               .bundle()
               .pipe(stream("index.js"))
               .pipe(gulp.dest("./fisource/"))
});

gulp.task("assets", function() {
    return gulp.src("./source/assets/**/*")
               .pipe(gulp.dest("./fisource/assets/"))
});

gulp.task("default", function() {
    gulp.start("markup", "styles", "scripts", "assets");
});
