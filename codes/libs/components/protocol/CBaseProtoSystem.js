/**
 * Created by Administrator on 2018/9/17.
 */
Class({
    ClassName: "App.Lib.Protocol.CBaseProtoSystem",
    Base:"App.Lib.CBaseSystem",
    msgs:null,
    handlers:null,
    messageCfg:null,
    messageNameCfg:null,
    init:function(){
        this.msgs={};
        this.handlers = {};
    },
    clear:function(){
        this.handlers = {};
    },
    bind:function(key,fun,target){
        if(!this.handlers.hasOwnProperty(key)){
            this.handlers[key] = [fun,target];
        }else{
            console.error("App.Lib.Protocol.CBaseProtoSystem:{0} bindPrototol more times").Format(key);
        }
    },
    unBind:function(key,fun,target){
        if(!this.handlers.hasOwnProperty(key)){
            console.error ("App.Lib.Protocol.CBaseProtoSystem unBindPrototol not has key:{0}".Format(key))
            return;
        }
        var info = this.handlers[key];
        if(info[0] != fun || info[1]!=target){
            console.error ("App.Lib.Protocol.CBaseProtoSystem unBindPrototol fun error in key:{0}".Format(key))
            return;
        }
        delete this.handlers[key]
    }
}).Static({
    Instance:Core.Instance
})