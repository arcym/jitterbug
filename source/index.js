var React = require("react")
var ReactRouter = require("react-router")
var Firebase = require("firebase")

var Route = ReactRouter.Route
var DefaultRoute = ReactRouter.DefaultRoute
var NotFoundRoute = ReactRouter.NotFoundRoute
var Link = ReactRouter.Link

var Game = require("./Game");
var Lobby = require("./Lobby");
var Kitchen = require("./Kitchen");

var routes = (
    <Route path="/" name="game" handler={Game}>
        <DefaultRoute handler={Kitchen}/>
        <Route name="lobby" path=":id" handler={Lobby}/>
    </Route>
)

ReactRouter.run(routes, function(Handler) {
    React.render(<Handler/>, document.body)
})