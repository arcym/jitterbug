var React = require("react")
var Reflux = require("reflux")

var CurrentUserStore = require("./CurrentUserStore")
var SetCurrentUserAction = require("./SetCurrentUserAction")

var UserPanel = React.createClass({
    mixins: [
        Reflux.ListenerMixin
    ],
    getInitialState: function() {
        return {
            id: 0
        }
    },
    componentDidMount: function() {
        this.listenTo(CurrentUserStore, this.onCurrentUserStore)
    },
    onCurrentUserStore: function(id) {
        this.setState({
            id: id
        })
    },
    onSetCurrentUser: function()
    {
        SetCurrentUserAction(1270011271)
    },
    render: function() {
        return (
            <div id="user-panel">
                {this.state.id}
                <button onClick={this.onSetCurrentUser}>
                    Set Current User!
                </button>
            </div>
        )
    }
})

module.exports = UserPanel