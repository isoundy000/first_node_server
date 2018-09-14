/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Session.CSessionSystem",
    sessions:null,
    nextId:1,
    init: function () {
        this.sessions = {};
    },
    clear:function() {
        this.sessions = {};
    },
    addSession: function (id,socketId) {
        var session = new App.Lib.Session.CSessionData(id,socketId);
        this.sessions[this.nextId++] = session;
    },
    removeSession:function(id){
        var session = this.sessions[id];
        delete this.sessions[id];
    }
}).Static({
    Instance: Core.Instance
})