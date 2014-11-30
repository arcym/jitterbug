var React = require("react")
var ReactRouter = require("react-router")
var ReactFire = require("reactfire")
var jQuery = $ = require("jquery")

var firebase = new Firebase("https://jitterbug.firebaseio.com")
var LOADING_GAME = "loading";

var Lobby = React.createClass({
    mixins: [
        ReactFire,
        ReactRouter.Navigation,
        ReactRouter.State
    ],
    getInitialState: function() {
        return {
            game: LOADING_GAME,
            chats: new Array()
        }
    },
    componentWillMount: function() {
        this.establishRefs()
        this.bindState()
    },
    componentWillReceiveProps: function() {
        this.unbindState()
        this.establishRefs()
        this.bindState()
    },
    establishRefs: function() {
        var id = this.getParams().id
        this.refs = {
            game: firebase.child("games").child(id),
            chats: firebase.child("chats").child(id)
        }
    },
    bindState: function() {
        this.bindAsObject(this.refs.game, "game")
        this.bindAsArray(this.refs.chats, "chats")
    },
    unbindState: function() {
        this.unbind("game")
        this.unbind("chats")
    },
    onSubmitChat: function(event) {
        event.preventDefault()
        var value = $(event.target).find("input").val()
        $(event.target).find("input").val(new String())
        this.refs.chats.push({
            text: value
        })
    },
    onDeleteGame: function(event) {
        this.refs.game.remove()
        this.refs.chats.remove()
        this.transitionTo("/")
    },
    render: function() {
        if(this.state.game === LOADING_GAME) {
            return (
                <div>
                    <h3>{this.getParams().id}</h3>
                    searching for your game...
                </div>
            )
        } else if(this.state.game === null) {
            return (
                <div>
                    <h3>{this.getParams().id}</h3>
                    your game wasnt found!
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
                    <form onSubmit={this.onSubmitChat}>
                        <input type="text"/>
                    </form>
                    <button onClick={this.onDeleteGame}>
                        Delete this Game
                    </button>
                </div>
            )
        }
    }
})

module.exports = Lobby
