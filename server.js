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
}*/

server = require("express")();

server.get("/", function(request, response)
{
    response.sendFile(__dirname + "/source/game.html");
});

server.use(require("./tools/style.transpiler.js"));
server.use(require("./tools/script.transpiler.js"));
server.use(require("express").static("./source/"));

server.listen(1271, function()
{
    console.log("The server is listening on " + 1271);
});