var React = require("react")
var ReactRouter = require("react-router")
var ReactFire = require("reactfire")
var jQuery = $ = require("jquery")

var firebase = new Firebase("https://jitterbug.firebaseio.com")

var Lobby = React.createClass({
    mixins: [
        ReactFire,
        ReactRouter.State
    ],
    getInitialState: function() {
        return {
            game: false,
            chats: false
        }
    },
    componentWillMount: function() {
        this.establishRefs()
        this.bindState()
    },
    componentWillReceiveProps: function() {
        this.establishRefs()
        this.bindState()
    },
    establishRefs: function() {
        var id = this.getParams().id;
        this.refs = {
            game: firebase.child("games").child(id),
            chats: firebase.child("chats").child(id)
        }
    },
    bindState: function() {
        this.setState(this.getInitialState())
        this.refs.game.once("value", function(data) {
            if(data.val() != null) {
                this.bindAsObject(this.refs.game, "game")
                this.bindAsArray(this.refs.chats, "chats")
            } else {
                //prompt players that the session wasn't found
                //by setting {this.state.game} to something.
            }
        }.bind(this))
    },
    onChatSubmit: function(event) {
        event.preventDefault()
        var value = $(event.target).find("input").val()
        $(event.target).find("input").val(new String())
        this.refs.chats.push({
            text: value
        })
    },
    render: function() {
        if(this.state.game == false) {
            return (
                <div>
                    <h3>{this.getParams().id}</h3>
                    searching for your game...
                </div>
            )
        } else {
            var chats = this.state.chats.map(function(chat, key) {
                return (
                    <li key={key}>
                        {chat.text}
                    </li>
                )
            })
            return (
                <div>
                    <h3>{this.getParams().id}</h3>
                    <ol>{chats}</ol>
                    <form onSubmit={this.onChatSubmit}>
                        <input type="text"/>
                    </form>
                </div>
            )
        }
    }
})

module.exports = Lobby
