/*if(process.argv.length > 2)
{
    if(process.argv[2] == "start")
    {
        var forever = require("forever");
        forever.start("server", {});
    }
    else if(process.argv[2] == "stop")
    {
        var forever = require("forever");
        forever.stop("server");
    }
}
*/

var fs = require("fs");
var gulp = require("gulp");
var express = require("express");
var beepbeep = require("beepbeep");
var colors = require("colors/safe");
var gulp_sass = require("gulp-sass");

server = express();
server.listen(1271);

server.get("/*.css", function(request, response)
{
    var file = "./source/" + request.params[0] + ".scss";
    
    gulp.src(file)
        .pipe(gulp_sass())
        .on("error", unerrorize)
        .pipe(throughify(response))
    
    function unerrorize(error)
    {
        var err_msg = error.plugin + " → " + error.message;
        err_msg = err_msg.replace(/\r?\n|\r/g, " ");
        
        console.error(colors.red(err_msg));
        response.status(500).send(err_msg);
        
        beepbeep();
    }
});

function throughify(stream)
{
    var through = require("through");
    
    function write(data) {stream.write(data.contents);}
    function end() {stream.end();}
    
    return through(write, end);
}

console.log("The server is at 127.0.0.1:1271.");