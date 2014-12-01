var React = require("react")
var ReactRouter = require("react-router")

var RouteHandler = ReactRouter.RouteHandler

var UserPanel = require("./UserPanel")

var Game = React.createClass({
    render: function() {
        return (
            <div id="game">
                <UserPanel/>
                <RouteHandler/>
            </div>
        )
    }
})

module.exports = Game