/**
 * Created by Administrator on 2018/9/17.
 */
Class({
    ClassName: "App.Lib.Protocol.CRpcProtoSystem",
    Base:"App.Lib.Protocol.CBaseProtoSystem",
    start:function(){
        var info = App.Rpc.CHandler;
        this.messageCfg = {};
        this.messageNameCfg = {};
        for(var key in info){
            this.messageCfg[info[key].id] = info[key]
            this.messageNameCfg[info[key].id] = key;
        }
    }
}).Static({
    Instance:Core.Instance
})