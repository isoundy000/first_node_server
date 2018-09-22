/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Rpc.CRpcData",
    netClient:null,
    ctor: function (cfg,pro) {
       this.netClient = App.Lib.Net.CNetClientSystem.Instance.newClient(
           cfg.type,cfg.host,cfg.port,
           this.onConnect.bind(this));
    },
    onConnect:function(){
        console.log("CRpcData onConnect")
    },
    send:function(data){
        this.netClient.send(data) ;
    }
})