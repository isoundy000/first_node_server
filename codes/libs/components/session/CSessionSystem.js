/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Session.CSessionSystem",
    Base:"App.Lib.CBaseSystem",
    frontSessions:null,
    backSession:null,
    nextId:0,
    init: function () {
        this.frontSessions = {};
        this.backSession = {};
        this.nextId = 0;
    },
    clear:function() {
        this.frontSessions = {};
        this.backSession = {};
        this.nextId = 0;
    },
    addSession: function (client,host,port,isFront) {
        let id = this.nextId++;
        let session = new App.Lib.Session.CSessionData(id,client,host,port,isFront);
        client.session= session;
        if(isFront){
            this.frontSessions[id] = session;
        }else{
            this.backSession[id] = session;
        }
    },
    removeSession:function(client,host,port){
        let id = client.session.id;
        if(client.isFront){
            if(this.frontSessions.hasOwnProperty(id)){
                let session = this.frontSessions[id];
                delete this.frontSessions[id];
            }
        }else{
            if(this.backSession.hasOwnProperty(id)){
                let session = this.backSession[id];
                delete this.backSession[id];
            }
        }

    }
}).Static({
    Instance: Core.Instance
})