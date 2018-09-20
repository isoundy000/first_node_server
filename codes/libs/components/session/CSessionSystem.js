/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Session.CSessionSystem",
    Base:"App.Lib.CBaseSystem",
    sessions:null,
    init: function () {
        this.sessions = {};
    },
    clear:function() {
        this.sessions = {};
    },
    addSession: function (server,socket,host,port) {
        var id = "{0}_{1}".Format(host,port);
        var session = new App.Lib.Session.CSessionData(id,socket,server,host,port);
        this.sessions[id] = session;
    },
    removeSession:function(id,initiative){
        if(this.sessions.hasOwnProperty(id)){
            var session = this.sessions[id];

            delete this.sessions[id];
        }
    }
}).Static({
    Instance: Core.Instance
})