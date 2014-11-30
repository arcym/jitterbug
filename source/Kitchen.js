var React = require("react")
var ReactFire = require("reactfire")
var ReactRouter = require("react-router")
var jQuery = $ = require("jquery")

var firebase = new Firebase("https://jitterbug.firebaseio.com")

var Kitchen = React.createClass({
    mixins: [
        ReactFire,
        ReactRouter.Navigation
    ],
    onNewGameSubmit: function(event)
    {
        event.preventDefault()
        var id = $(event.target).find("input").val()
        $(event.target).find("input").val(new String())
        var ref = firebase.child("games").child(id)
        ref.set({
            dateCreated: Date.now()
        }, function() {
            this.transitionTo("/" + id);
        }.bind(this))
    },
    render: function() {
        return (
            <div>
                <h2>This is the "kitchen."</h2>
                <div>Want to make a game?</div>
                <form onSubmit={this.onNewGameSubmit}>
                    <input type="text"/>
                </form>
            </div>
        )
    }
})

module.exports = Kitchen