var React = require("react")
var ReactRouter = require("react-router")

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;

var Game = React.createClass({
    render: function() {
        return (
            <div>
                <div>
                    <Link to="/session">Session</Link>
                    <Link to="/">Splash</Link>
                </div>
                <RouteHandler/>
            </div>
        )
    }
})

var Splash = React.createClass({
    render: function() {
        return (
            <div>
                Splash!!
            </div>
        )
    }
})

var Session = React.createClass({
    render: function() {
        return (
            <div>
                Session.
            </div>
        )
    }
})

var Nothing = React.createClass({
    render: function() {
        return (
            <div>
                ...
            </div>
        )
    }
})

var routes = (
    <Route name="game" path="/" handler={Game}>
        <DefaultRoute handler={Splash}/>
        <Route name="session" handler={Session}/>
        <NotFoundRoute handler={Nothing}/>
    </Route>
)

ReactRouter.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById("game"))
})