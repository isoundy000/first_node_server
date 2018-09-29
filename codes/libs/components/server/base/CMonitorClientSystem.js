Class({
    ClassName: "App.Lib.Server.CMonitorClientSystem",
    startCheckInterval:null,
    init:function(){
        App.Lib.Protocol.CRpcProtoSystem.Instance.bind("allServerStart",this.allServerStart,this);
    },
    start:function(){
        if(null != this.startCheckInterval){
            clearInterval(this.startCheckInterval);
            this.startCheckInterval = null;
        }
        this.startCheckInterval = setInterval(function () {
            let clientData = {"name":App.System.name,num:App.System.serverIndex};
            App.Lib.Rpc.CRpcSystem.Instance.send(null,"Monitor","serverStart",clientData);
        },1000)
    },
    allServerStart:function () {
        if(null != this.startCheckInterval){
            clearInterval(this.startCheckInterval);
            this.startCheckInterval = null;
        }
    }
}).Static({
    Instance:Core.Instance
})