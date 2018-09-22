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
    start:function(){
        var info = App.Server[App.System.name].CHandler;
        this.messageCfg = {};
        this.messageNameCfg = {};
        for(var key in info){
            this.messageCfg[info[key].id] = info[key]
            this.messageNameCfg[info[key].id] = key;
        }
    },
    addmap:function(key,fun,target){
        if(!this.handlers.hasOwnProperty(key)){
            this.handlers[key] = [];
        }
        this.handlers[key].push([fun,target]);
    },
    removemap:function(key,fun,target){
        if(!this.handlers.hasOwnProperty(key)){
            throw "App.Lib.Protocol.CBaseProtoSystem removemap not has key:"+key;
            return;
        }
        var ay = this.handlers[key];
        var info = null;
        for(var i=0;i<ay.length;i++){
            info = ay[i];
            if(info[0] == fun && ay[1] == target){
                ay.splice(i,1);
                return;
            }
        }
        throw "App.Lib.Protocol.CBaseProtoSystem removemap not find";
    },
    dispatchMsg:function(key,msg,client){
        if(!this.handlers.hasOwnProperty(key)){
            console.warn("App.Lib.Protocol.CBaseProtoSystem not use key:"+key)
            return;
        }
        var ay = this.handlers[key];
        var info = null;
        for(var i=0;i<ay.length;i++){
            info = ay[i];
            info[0].call(info[1],msg,client);
        }
    },
    onMessage:function(buff,client) {
        var id = buff[0]<<8 | buff[1];
        var  mBuff = buff.slice(2,buff.length);
        var info =this.messageCfg[id];
        var name = this.messageNameCfg[id];
        var msg = info.struct.decode(mBuff);
        this.dispatchMsg(name,msg,client);
    },
    encode:function(info,msg){
        try{
            var mCodes = new info.struct(msg).encode();
            var mBuffer = mCodes.buffer;
            var id = info.id;
            var nBuffer = new Buffer(2+mCodes.limit);
            nBuffer[0]=id>>8;
            nBuffer[1]=id&0xff;
            mBuffer.copy(nBuffer,2,0,mCodes.limit);
            return nBuffer;
        }catch(e){
            throw "App.Lib.Protocol.CBaseProtoSystem err:"+ e.toString();
            return null;
        }
    }
}).Static({
    Instance:Core.Instance
})