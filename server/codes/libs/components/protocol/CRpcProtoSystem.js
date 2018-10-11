/**
 * Created by Administrator on 2018/9/17.
 */
Class({
    ClassName: "App.Lib.Protocol.CRpcProtoSystem",
    Base:"App.Lib.Protocol.CBaseProtoSystem",
    encode:function(index,info,msg){
        try{
            let mCodes = null;
            let mCodesLength = 0;
            if(void 0 != info.struct){
                mCodes = new info.struct(msg).encode();
                mCodesLength = mCodes.limit;
            }
            let id = info.id;
            let nBuffer = new Buffer(6+mCodesLength);
            nBuffer[0]=id>>8;
            nBuffer[1]=id&0xff;
            nBuffer[2]=(index>>24) & 0xff;
            nBuffer[3]=(index>>16) & 0xff;
            nBuffer[4]=(index>>8) & 0xff;
            nBuffer[5]=index & 0xff;
            if(mCodesLength>0){
                let mBuffer = mCodes.buffer;
                mBuffer.copy(nBuffer,6,0,mCodes.limit);
            }
            return nBuffer;
        }catch(e){
            console.error( "App.Lib.Protocol.CBaseProtoSystem err:"+ e.toString());
            return null;
        }
    },
    dispatchMsg:function(id,key,msg,session){
        let info = this.handlers[key];
        let self = this;
        (async () => {
            let backData = info[0].call(info[1],msg);
            let reqInfo = App.Rpc.CHandler[key];
            if(void 0 != reqInfo.cb){
                let responseInfo = App.Rpc.CHandler[reqInfo.cb];
                backData = self.encode(id,responseInfo,backData);
                session.send(backData);
            }
        })();
    },
    onMessage:function(buff,session) {
        let id = (buff[0]<<8) | buff[1];
        let id2 = ( buff[2]<<24) | (buff[3]<<16) | (buff[4]<<8) | buff[5];
        let  mBuff = buff.slice(6,buff.length);
        let info =this.messageCfg[id];
        let name = this.messageNameCfg[id];
        let msg = null;
        if(void 0 != info.struct){
            msg = info.struct.decode(mBuff);
        }
        if(this.handlers.hasOwnProperty(name)){
            this.dispatchMsg(id2,name,msg,session);
        }else{
            App.Lib.Rpc.CRpcSystem.Instance.onCallBack(id2,msg);
        }
    },
    start:function(){
        let info = App.Rpc.CHandler;
        this.messageCfg = {};
        this.messageNameCfg = {};
        for(let key in info){
            this.messageCfg[info[key].id] = info[key]
            this.messageNameCfg[info[key].id] = key;
        }
    }
}).Static({
    Instance:Core.Instance
})