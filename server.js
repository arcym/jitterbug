var SCRDIR = "./source";

server = require("express")();

server.use(require("./tools/style.transpiler.js")(SCRDIR));
server.use(require("./tools/script.transpiler.js")(SCRDIR));
server.use(require("express").static(SCRDIR));

server.listen(1271, function()
{
    console.log("The server is listening on " + 1271);
});