var React = require("react")
var ReactRouter = require("react-router")
var Firebase = require("firebase")

var Route = ReactRouter.Route
var DefaultRoute = ReactRouter.DefaultRoute
var NotFoundRoute = ReactRouter.NotFoundRoute
var Link = ReactRouter.Link

var Game = require("./Game");
var SessionLobby = require("./SessionLobby");

var routes = (
    <Route path="/" name="game" handler={Game}>
        <DefaultRoute handler={SessionLobby}/>
    </Route>
)

ReactRouter.run(routes, function(Handler) {
    React.render(<Handler/>, document.body)
})