/**
 * Created by Administrator on 2018/9/22.
 */
Class({
    ClassName:"App.Server.CFrontMessageHandler",
    bind:function(){
        App.Lib.Protocol.CFrontProtoSystem.Instance.bind("token",this.token,this);
    },
    token:function(msg,session) {
        console.warn("App.Server.CFrontMessageHandler token:"+JSON.stringify(msg));
    }
}).Static({
    Instance:Core.Instance
})