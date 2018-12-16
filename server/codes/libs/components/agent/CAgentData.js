/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Agent.CAgentData",
    session:null,
    id:null,
    filterData:null,

    ctor: function (id,session) {
        this.id = id;
        this.session = session;
        this.filterData = new App.Lib.Filter.CFilterData();
    },
    setLoginSuc:function () {
        this.filterData.set(App.Lib.Filter.CDefultFilterKey.keys.login)
    }
})