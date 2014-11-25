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

var gulp = require("gulp");
var express = require("express");

server = express();

server.get("/*.css", function(request, response)
{
    var path = "./source/" + request.params[0] + ".scss";
    
    gulp.src(path)
        .pipe(require("gulp-sass")({outputStyle: "compressed"}))
        //.pipe(require("gulp-autoprefixer")("last 2 versions")
        .pipe(throughify(response));
});

server.listen(1271);

console.log("The server is at 127.0.0.1:1271.");

function throughify(stream)
{
    var through = require("through");
    
    function write(data) {stream.write(data.contents);}
    function end() {stream.end();}
    
    return through(write, end);
}