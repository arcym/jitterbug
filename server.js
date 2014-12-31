var SCRDIR = __dirname + "/project";

server = require("express")();

server.use(require("./style.server.js")(SCRDIR));
server.use(require("./script.server.js")(SCRDIR));
server.use(require("express").static(SCRDIR));

server.listen(1271, function()
{
    console.log("The server is listening on " + 1271);
});