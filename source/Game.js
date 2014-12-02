var React = require("react")
var ReactRouter = require("react-router")

var RouteHandler = ReactRouter.RouteHandler

var Game = React.createClass({
    render: function() {
        return (
            <div id="game">
                <RouteHandler/>
            </div>
        )
    }
})

module.exports = Game