server = require("express")();

server.use(require("./tools/style.transpiler.js"));
server.use(require("./tools/script.transpiler.js"));
server.use(require("express").static("./source/"));

server.get("/", function(request, response)
{
    response.sendFile(__dirname + "/source/game.html");
});

server.listen(1271, function()
{
    console.log("The server is listening on " + 1271);
});