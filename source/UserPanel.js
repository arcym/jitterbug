var React = require("react")
var firebase = new Firebase("https://jitterbug.firebaseio.com")

var UserPanel = React.createClass({
    /*componentWillMount: function() {
        firebase.onAuth(function(data) {
            console.log(data.uid)
            if(data != null) {
                this.refs.user = firebase.child("users").child(data.uid)
                this.bindAsObject(this.refs.user, "user")
                console.log("logged in!")
            } else {
                delete this.refs.user
                this.unbind("user")
                console.log("logged out!")
            }
        }.bind(this))
    },*/
    render: function() {
        return (
            <div id="user-panel">
                Hello World!
            </div>
        )
    }
})

module.exports = UserPanel