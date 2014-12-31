var through = require("through");

module.exports = function(stream)
{
    function write(data)
    {
        stream.write(data.contents);
    }

    function end()
    {
        stream.end();
    }
    
    return through(write, end);
}