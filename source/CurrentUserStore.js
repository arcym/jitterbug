var Reflux = require("reflux")

var SetCurrentUserAction = require("./SetCurrentUserAction")

var CurrentUserStore = Reflux.createStore({
    init: function() {
        this.listenTo(SetCurrentUserAction, this.onSetCurrentUserAction)
    },
    onSetCurrentUserAction: function(id) {
        this.trigger(id)
    }
})

module.exports = CurrentUserStore