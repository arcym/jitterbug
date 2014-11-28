var beepbeep = require("beepbeep");
var colors = require("colors/safe");

module.exports = function(error)
{
    report = error.plugin + " → " + error.message;
    report = report.replace(/\r?\n|\r/g, " ");
    report = colors.red(report);
    
    console.error(report);
    beepbeep();
}