/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Session.CSessionData",
    client:null,
    host:null,
    port:null,
    id:null,
    isFront:false,
    ctor:function(id,client,host,port,isFront){
        this.id = id;
        this.client = client;
        this.host = host;
        this.port = port;
        this.isFront = isFront;
    }
})