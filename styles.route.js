var fs = require("fs");
var express = require("express");
var through = require("through");

var beepbeep = require("beepbeep");
var colors = require("colors/safe");

var gulp = require("gulp");
var gulp_sass = require("gulp-sass");
var gulp_autoprefixer = require("gulp-autoprefixer");

var SASS_CONFIGURATION = {outputStyle: "compressed"};
var AUTOPREFIXER_CONFIGURATION = {browsers: ["last 2 versions"]};

route = express.Router();
route.get("/*.css", function(request, response)
{
    var file = "./source/" + request.params[0] + ".scss";
    
    gulp.src(file)
        .pipe(gulp_sass(SASS_CONFIGURATION))
        .on("error", function(error) {report(error, request, response)})
        .pipe(gulp_autoprefixer(AUTOPREFIXER_CONFIGURATION))
        .pipe(throughify(response))
});

function report(error, request, response)
{
    var error_report = error.plugin + " → " + error.message;
    error_report = error_report.replace(/\r?\n|\r/g, " ");
    
    console.error(colors.red(error_report));
    response.status(500).send(error_report);
    
    beepbeep();
}

function throughify(stream)
{
    function write(data) {stream.write(data.contents);}
    function end() {stream.end();}
    
    return through(write, end);
}

module.exports = route;