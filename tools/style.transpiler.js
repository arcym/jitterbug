var fs = require("fs");
var path = require("path");

var express = require("express");

var gulp = require("gulp");
var gulp_sass = require("gulp-sass");
var gulp_autoprefixer = require("gulp-autoprefixer");

var beepbeep = require("beepbeep");
var colors = require("colors/safe");

var throughify = require("./throughify");


route = express.Router();
route.get("/*.css", function(request, response, next)
{
    var source = "./source/" + request.params[0] + ".scss";
    
    fs.exists(source, function(exists)
    {
        if(exists)
        {
            gulp.src(source)
                .pipe(gulp_sass())
                .on("error", function(error)
                {
                    response.status(500).send(":<");
                    
                    report = error.message;
                    report = report.replace(/\r?\n|\r/g, " ");
                    report = colors.red(report);
                    console.error(report);
                    
                    beepbeep();
                })
                .pipe(gulp_autoprefixer())
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