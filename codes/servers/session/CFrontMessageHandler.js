/**
 * Created by Administrator on 2018/9/22.
 */
Class({
    ClassName:"App.Server.CFrontMessageHandler",
    bind:function(){
        App.Lib.Protocol.CFrontProtoSystem.Instance.addmap("token",this.token,this);
    },
    token:function(msg,client) {
        console.warn(JSON.stringify(msg));
    }
}).Static({
    Instance:Core.Instance
})