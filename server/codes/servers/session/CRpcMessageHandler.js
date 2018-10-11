/**
 * Created by Administrator on 2018/9/22.
 */
Class({
    ClassName:"App.Server.CRpcMessageHandler",
    bind:function(){
        App.Lib.Protocol.CRpcProtoSystem.Instance.bind("sessionToken",this.sessionToken);
    },
    sessionToken:function(msg,session) {
        // App.Lib.Rpc.CRpcSystem.Instance.send(null,"Fight","sessionTokenesponse");
        return null;
    }

}).Static({
    Instance:Core.Instance
})