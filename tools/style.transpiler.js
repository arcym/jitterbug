var fs = require("fs");
var express = require("express");

var reportify = require("./reportify");
var throughify = require("./throughify");

var beepbeep = require("beepbeep");
var colors = require("colors/safe");

var gulp = require("gulp");
var gulp_sass = require("gulp-sass");
var gulp_autoprefixer = require("gulp-autoprefixer");

var SASS_OPTIONS = {outputStyle: "compressed"};
var AUTOPREFIXER_OPTIONS = {browsers: ["last 2 versions"]};


route = express.Router();
route.get("/*.css", function(request, response, next)
{
    var source = "./source/" + request.params[0] + ".scss";
    
    fs.exists(source, function(exists)
    {
        if(exists)
        {
            gulp.src(source)
                .pipe(gulp_sass(SASS_OPTIONS))
                .on("error", function(error)
                {
                    response.status(500).send(":<");
                    reportify(error);
                })
                .pipe(gulp_autoprefixer(AUTOPREFIXER_OPTIONS))
                .pipe(throughify(response))
            
            response.set("Content-Type", "text/css");
        }
        else
        {
            next();
        }
    });
});

module.exports = route;