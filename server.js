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

var through = require("through");
var express = require("express");

server = express();

server.use(require("./styles.route.js"));

server.listen(1271, function()
{
    console.log("The server is listening on " + 1271);
});