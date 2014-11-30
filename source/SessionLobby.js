var React = require("react")
var ReactFire = require("reactfire")
var jQuery = require("jquery")

var SessionLobby = React.createClass({
    mixins: [
        ReactFire
    ],
    getInitialState: function() {
        return {
            chat: []
        }
    },
    componentWillMount: function() {
        this.firebase = new Firebase("https://jitterbug.firebaseio.com/chat");
        this.bindAsArray(this.firebase, "chat")
    },
    onChatSubmit: function(event) {
        event.preventDefault()
        
        var value = jQuery(event.target).find("input").val()
        jQuery(event.target).find("input").val(new String())
        
        this.firebase.push({
            text: value
        })
    },
    render: function() {
        var chat = this.state.chat.map(function(chat, key) {
            return (
                <li key={key}>
                    {chat.text}
                </li>
            )
        })
        return (
            <div>
                <h3>Say something, will ya?</h3>
                <ol>{chat}</ol>
                <form onSubmit={this.onChatSubmit}>
                    <input type="text"/>
                </form>
            </div>
        )
    }
})

module.exports = SessionLobby