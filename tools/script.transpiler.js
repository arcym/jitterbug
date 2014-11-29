var fs = require("fs");
var path = require("path");

var express = require("express");

var reactify = require("reactify");
var browserify = require("browserify");

var beepbeep = require("beepbeep");
var colors = require("colors/safe");


module.exports = function(SRCDIR)
{
    route = express.Router();
    
    route.get("/index.js", function(request, response, next)
    {
        var source = SRCDIR + "/index.js";
        
        fs.exists(source, function(exists)
        {
            if(exists)
            {
                browserify(source)
                    .transform("reactify")
                    .bundle()
                    .on("error", function(error)
                    {
                        response.status(500).send(":<");
                        
                        report = error.message;
                        report = report.replace(/\r?\n|\r/g, " ");
                        report = colors.red(report);
                        console.error(report);
                        
                        beepbeep();
                    })
                    .pipe(response);
                
                response.set("Content-Type", "text/javascript");
            }
            else
            {
                next();
            }
        });
    });

    return route;
};