Class({
    ClassName: "App.Lib.Filter.CValidLoginFilter",
    filter: function (agent) {
        return agent.filterData.check(App.Lib.Filter.CDefultFilterKey.keys.login)
    }
})