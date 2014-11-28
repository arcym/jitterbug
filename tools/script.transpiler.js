var fs = require("fs");
var express = require("express");

var report = require("./reportify");
var throughify = require("./throughify");

var gulp = require("gulp");
var gulp_browserify = require("gulp-browserify");

var BROWSERIFY_OPTIONS = {/*?!*/};


route = express.Router();
route.get("/game.js", function(request, response, next)
{
    var source = "./source/game.js";
    
    fs.exists(source, function(exists)
    {
        if(exists)
        {
            gulp.src(source)
                .pipe(gulp_browserify(BROWSERIFY_OPTIONS))
                .on("error", function(error)
                {
                    response.status(500).send(":<");
                    reportify(error);
                })
                .pipe(throughify(response))
            
            response.set("Content-Type", "text/javascript");
        }
        else
        {
            next();
        }
    });
});

module.exports = route;