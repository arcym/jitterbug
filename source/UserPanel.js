var React = require("react")
var Reflux = require("reflux")

var CurrentUser = require("./CurrentUser")

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
        this.listenTo(CurrentUser.Store, this.onCurrentUserStore)
    },
    onCurrentUserStore: function(id) {
        this.setState({
            id: id
        })
    },
    onSetCurrentUser: function()
    {
        CurrentUser.Actions.SetID(Date.now())
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