var Reflux = require("reflux")

var CurrentUserActions = Reflux.createActions([
    "SetID"
])

var CurrentUserStore = Reflux.createStore({
    init: function() {
        this.listenTo(CurrentUserActions.SetID, this.onSetID)
    },
    onSetID: function(id) {
        this.trigger(id)
    }
})

module.exports = {
    Actions: CurrentUserActions,
    Store: CurrentUserStore
}