var fs = require("fs");
var path = require("path");

var express = require("express");

var gulp = require("gulp");
var gulp_sass = require("gulp-ruby-sass");
var gulp_autoprefixer = require("gulp-autoprefixer");

var beepbeep = require("beepbeep");
var colors = require("colors/safe");

var throughify = require("./throughify");

var SASS_OPTIONS = {style: "compressed", quiet: true, "sourcemap=none": true}
var AUTOPREFIXER_OPTIONS = "last 2 version"
    
module.exports = function(SRCDIR)
{
    route = express.Router();
    
    route.get("/*.css", function(request, response, next)
    {
        var source = SRCDIR + "/" + request.params[0] + ".scss";
        
        fs.exists(source, function(exists)
        {
            if(exists)
            {
                gulp.src(source)
                    .pipe(gulp_sass(SASS_OPTIONS))
                    .on("error", function(error)
                    {
                        response.status(500).send(":<");
                        
                        report = error.message;
                        report = report.replace(/\r?\n|\r/g, " ");
                        report = colors.red(report);
                        console.error(report);
                        
                        beepbeep();
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

    return route;
};