Class({
    ClassName: "App.Lib.Filter.CValidServerFilter",
    filter: function (agent) {
        return agent.filterData.check(App.Lib.Filter.CDefultFilterKey.keys.server)
    }
})