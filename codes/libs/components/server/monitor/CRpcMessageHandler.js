/**
 * Created by Administrator on 2018/9/22.
 */
Class({
    ClassName:"App.Server.CRpcMessageHandler",
    bind:function(){
        App.Lib.Protocol.CRpcProtoSystem.Instance.bind("serverStart",this.serverStart);
    },
    serverStart:function(msg,client) {
        App.Server.CMonitorServerSystem.Instance.onServerStart(msg.name,msg.num);
    }
}).Static({
    Instance:Core.Instance
})