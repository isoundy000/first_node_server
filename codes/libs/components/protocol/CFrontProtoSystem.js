/**
 * Created by Administrator on 2018/9/17.
 */
Class({
    ClassName: "App.Lib.Protocol.CFrontProtoSystem",
    Base:"App.Lib.Protocol.CBaseProtoSystem",
    start:function(){
        var info = App.Server[App.System.name].CHandler;
        this.messageCfg = {};
        this.messageNameCfg = {};
        for(var key in info){
            this.messageCfg[info[key].id] = info[key]
            this.messageNameCfg[info[key].id] = key;
        }
    }
})