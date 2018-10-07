/**
 * Created by Administrator on 2018/9/22.
 */
Class({
    ClassName:"App.Server.CRpcMessageHandler",
    bind:function(){
        App.Lib.Protocol.CRpcProtoSystem.Instance.bind("sessionToken",this.sessionToken);
    },
    sessionToken:function(msg,session) {
        // console.warn("App.Server.CRpcMessageHandler sessionToken:"+JSON.stringify(msg));
        // App.Lib.Rpc.CRpcSystem.Instance.send(null,"Fight","fightToken",{"token":"456"});
        return null;
    }

}).Static({
    Instance:Core.Instance
})