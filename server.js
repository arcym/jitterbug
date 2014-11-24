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
var stream = require("stream");
var gulp = require("gulp");
var express = require("express");

server = express();

server.get("/*.css", function(request, response)
{
	var path = "./source/" + request.params[0] + ".scss";
	gulp.src(path).pipe(through(response));
});

server.listen(1271);

console.log("The server is at 127.0.0.1:1271.");

function through(response)
{
	return require("through")(function(data) {
		response.write(data.contents);
	}, function() {response.end()});
}