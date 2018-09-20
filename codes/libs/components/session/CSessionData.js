/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Session.CSessionData",
    server:null,
    host:null,
    port:null,
    agent:null,
    id:null,
    ctor:function(id,server,host,port){
        this.id = id;
        this.server = server;
        this.host = host;
        this.port = port;
    }
})