/**
 * Created by Administrator on 2018/9/22.
 */
Class({
    ClassName: "App.Lib.Net.CNetClientSystem",
    Base:"App.Lib.CBaseSystem",
    clients:null,
    init:function(){
        this.clients = [];
    },
    clear:function(){
    },
    start:function(){
        for(var i=0;i<this.clients.length;i++){
            this.clients[i].start();
        }
    },
    stop:function(){
        for(var i=0;i<this.clients.length;i++){
            this.clients[i].stop();
        }
    },
    newClient:function(serverType,host,port,connectCb,closeCb) {
        let client = App.Lib.Net.CBaseNetClient.create(serverType,host,port,connectCb,closeCb);
        this.clients.push(client);
        return client;
    }
}).Static({
    Instance: Core.Instance
})