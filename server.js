server = require("express")();

server.use(require("./tools/style.transpiler.js"));
server.use(require("./tools/script.transpiler.js"));
server.use(require("express").static(process.cwd()));

server.listen(1271, function()
{
    console.log("The server is listening on " + 1271);
});