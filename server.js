if(process.argv.length > 2)
{
	if(process.argv[2] == "start")
	{
		var forever = require("forever");
		forever.start("server", new Object());
		console.log("started forever");
	}
	else if(process.argv[2] == "stop")
	{
		var forever = require("forever");
		forever.stop("server");
		console.log("stopped forever");
	}
}
else
{
	express = require("express");
	
	server = express();
	server.get("/", function(request, response)
	{
		console.log("Hello World!");
		response.send("Hello World!");
	});
	server.listen(1271);
	
	console.log("The server is at 127.0.0.1:1271.");
}