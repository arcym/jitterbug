var fs = require("fs");
var gulp = require("gulp");
var express = require("express");
var through = require("through");
var beepbeep = require("beepbeep");
var colors = require("colors/safe");
var gulp_sass = require("gulp-sass");

var SASS_OPTIONS = {outputStyle: "compressed"};

route = express.Router();
route.get("/*.css", function(request, response)
{
    var file = "./source/" + request.params[0] + ".scss";
    
    gulp.src(file)
        .pipe(gulp_sass(SASS_OPTIONS))
        .on("error", report)
        .pipe(throughify(response))
    
    function report(error)
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
});

module.exports = route;