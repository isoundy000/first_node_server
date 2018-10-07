/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Agent.CAgentData",
    session:null,
    id:null,
    ctor: function (id,session) {
        this.id = id;
        this.session = session;
    }
})