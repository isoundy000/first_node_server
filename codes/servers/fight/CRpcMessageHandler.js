/**
 * Created by Administrator on 2018/9/22.
 */
Class({
    ClassName:"App.Server.CRpcMessageHandler",
    bind:function(){
        App.Lib.Protocol.CRpcProtoSystem.Instance.addmap("fightToken",this.fightToken,this);
    },
    fightToken:function(msg,client) {
        console.warn("fightToken:"+JSON.stringify(msg));
    }
}).Static({
    Instance:Core.Instance
})