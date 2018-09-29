/**
 * Created by Administrator on 2018/9/22.
 */
Class({
    ClassName:"App.Server.CRpcMessageHandler",
    bind:function(){
        App.Lib.Protocol.CRpcProtoSystem.Instance.bind("fightToken",this.fightToken);
    },
    fightToken:function(msg,session) {
        // console.warn("App.Server.CRpcMessageHandler fightToken:"+JSON.stringify(msg));
    }
}).Static({
    Instance:Core.Instance
})