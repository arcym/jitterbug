var React = require("react")
var ReactRouter = require("react-router")
var ReactFire = require("reactfire")
var jQuery = require("jquery")

var firebase = new Firebase("https://jitterbug.firebaseio.com")

var Lobby = React.createClass({
    mixins: [
        ReactFire,
        ReactRouter.Navigation,
        ReactRouter.State
    ],
    getInitialState: function() {
        return {
            game: {},
            chats: []
        }
    },
    componentWillMount: function() {
        var id = this.getParams().id;
        this.refs = {
            game: firebase.child("games").child(id),
            chats: firebase.child("chats").child(id)
        }
        
        this.bindAsObject(this.refs.game, "game")
        this.bindAsArray(this.refs.chats, "chats")
    },
    componentWillReceiveProps: function() {
        console.log("!")
        this.forceUpdate()
    },
    onChatSubmit: function(event) {
        event.preventDefault()
        
        var value = jQuery(event.target).find("input").val()
        jQuery(event.target).find("input").val(new String())
        
        this.refs.chats.push({
            text: value
        })
    },
    render: function() {
        var chats = this.state.chats.map(function(chat, key) {
            return (
                <li key={key}>
                    {chat.text}
                </li>
            )
        })
        return (
            <div>
                <h3>Say something, will ya?</h3>
                <ol>{chats}</ol>
                <form onSubmit={this.onChatSubmit}>
                    <input type="text"/>
                </form>
            </div>
        )
    }
})

module.exports = Lobby