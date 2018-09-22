/**
 * Created by Administrator on 2018/9/22.
 */
Class({
    ClassName:"App.Server.CRpcMessageHandler",
    bind:function(){
        App.Lib.Protocol.CRpcProtoSystem.Instance.addmap("sessionToken",this.sessionToken,this);
    },
    sessionToken:function(msg,client) {
        console.warn("sessionToken:"+JSON.stringify(msg));
        App.Lib.Rpc.CRpcSystem.Instance.send("Fight","fightToken",{"token":"456"});
    }
}).Static({
    Instance:Core.Instance
})