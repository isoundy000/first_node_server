/**
 * Created by Administrator on 2018/9/17.
 */
Class({
    ClassName: "App.Lib.Protocol.CFrontProtoSystem",
    Base:"App.Lib.Protocol.CBaseProtoSystem",
    encode:function(info,msg){
        try{
            let mCodes = new info.struct(msg).encode();
            let mBuffer = mCodes.buffer;
            let id = info.id;
            let nBuffer = new Buffer(2+mCodes.limit);
            nBuffer[0]=id>>8;
            nBuffer[1]=id&0xff;
            mBuffer.copy(nBuffer,2,0,mCodes.limit);
            return nBuffer;
        }catch(e){
            console.error("App.Lib.Protocol.CBaseProtoSystem err:"+ e.toString() ) ;
            return null;
        }
    },
    dispatchMsg:function(key,msg,client){
        if(!this.handlers.hasOwnProperty(key)){
            return;
        }
        let self = this;
        (async () => {
            let info = self.handlers[key];
            let backData = info[0].call(info[1],msg);
            let reqInfo = self.messageCfg[id];
            if(void 0 != reqInfo.cb){
                let responseInfo = self.messageCfg[reqInfo.cb];
                backData = self.encode(responseInfo,backData);
                client.send(backData);
            }
        })();
    },
    onMessage:function(buff,client) {
        let id = buff[0]<<8 | buff[1];
        let  mBuff = buff.slice(2,buff.length);
        let info =this.messageCfg[id];
        let name = this.messageNameCfg[id];
        let msg = info.struct.decode(mBuff);
        this.dispatchMsg(name,msg,client);
    },
    start:function(){
        if(null == App.Server[App.System.name]){
            return;
        }
        let info = App.Server[App.System.name].CHandler;
        this.messageCfg = {};
        this.messageNameCfg = {};
        for(let key in info){
            this.messageCfg[info[key].id] = info[key]
            this.messageNameCfg[info[key].id] = key;
        }
    }
})