var React = require("react")
var ReactRouter = require("react-router")
var Firebase = require("firebase")
var ReactFire = require("reactfire")

var Route = ReactRouter.Route
var DefaultRoute = ReactRouter.DefaultRoute
var NotFoundRoute = ReactRouter.NotFoundRoute
var RouteHandler = ReactRouter.RouteHandler
var Link = ReactRouter.Link

var Game = React.createClass({
    mixins: [
        ReactFire
    ],
    getInitialState: function() {
        return {
            users: []
        }
    },
    componentWillMount: function() {
        var firebase = new Firebase("https://jitterbug.firebaseio.com/users");
        this.bindAsArray(firebase, "users");
    },
    render: function() {
        var users = this.state.users.map(function(user) {
            return (
                <li>
                    {user}
                </li>
            )
        })
        return (
            <div>
                <ol>{users}</ol>
            </div>
        )
    }
})

React.render(<Game/>, document.getElementById("game"))

/*var Splash = React.createClass({
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
})*/