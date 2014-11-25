var fs = require("fs");
var express = require("express");
var through = require("through");

var beepbeep = require("beepbeep");
var colors = require("colors/safe");

var gulp = require("gulp");
var gulp_sass = require("gulp-sass");
var gulp_autoprefixer = require("gulp-autoprefixer");

var SASS_OPTIONS = {outputStyle: "compressed"};
var AUTOPREFIXER_OPTIONS = {browsers: ["last 2 versions"]};


route = module.exports = express.Router();
route.get("/*.css", function(request, response, next)
{
    var file = "./source/" + request.params[0] + ".scss";
    
    fs.exists(file, function(exists)
    {
        if(exists)
        {
            gulp.src(file)
                .pipe(gulp_sass(SASS_OPTIONS))
                .on("error", function(error)
                {
                    response.status(500).end();
                    report(error);
                })
                .pipe(gulp_autoprefixer(AUTOPREFIXER_OPTIONS))
                .pipe(throughify(response))
        }
        else
        {
            next();
        }
    });
});

function report(error)
{
    var report = error.plugin + " → " + error.message;
    report = report.replace(/\r?\n|\r/g, " ");
    report = colors.red(report);
    
    console.error(report);
    beepbeep();
}

function throughify(stream)
{
    function write(data) {stream.write(data.contents);}
    function end() {stream.end();}
    
    return through(write, end);
}