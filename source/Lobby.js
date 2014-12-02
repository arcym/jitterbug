var React = require("react")
var ReactRouter = require("react-router")
var Firebase = require("firebase")
var ReactFire = require("reactfire")
var jQuery = $ = require("jquery")

var firebase = new Firebase("https://jitterbug.firebaseio.com")

var LOADING_SESSION = "LOADING_SESSION"

var UserPanel = require("./UserPanel")

var Lobby = React.createClass({
    mixins: [
        ReactFire,
        ReactRouter.Navigation,
        ReactRouter.State
    ],
    getInitialState: function() {
        return {
            session: LOADING_SESSION,
            chats: new Array(),
            user: null
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
            session: firebase.child("sessions").child(id),
            chats: firebase.child("chats").child(id)
        }
    },
    bindState: function() {
        this.bindAsObject(this.refs.session, "session")
        this.bindAsArray(this.refs.chats, "chats")
    },
    unbindState: function() {
        this.unbind("session")
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
    onJoinSession: function(event) {
        firebase.authAnonymously(function(error, data) {
            if(error) {
                console.error(error)
            } else {
                console.log(data)
            }
        })
    },
    onDeleteSession: function(event) {
        this.refs.session.remove()
        this.refs.chats.remove()
        this.transitionTo("/")
    },
    render: function() {
        if(this.state.session === LOADING_SESSION) {
            return (
                <div>
                    <h3>{this.getParams().id}</h3>
                    searching for your session...
                    <UserPanel/>
                </div>
            )
        } else if(this.state.session === null) {
            return (
                <div>
                    <h3>{this.getParams().id}</h3>
                    your session wasnt found!
                    <UserPanel/>
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
                    <button onClick={this.onDeleteSession}>
                        Delete this Session
                    </button>
                    <button onClick={this.onJoinSession}>
                        Join this Session
                    </button>
                    <UserPanel/>
                </div>
            )
        }
    }
})

module.exports = Lobby
