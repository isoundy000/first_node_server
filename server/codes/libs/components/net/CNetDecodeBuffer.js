Class({
    ClassName: "App.Lib.Net.CNetDecodeBuffer",
    cacheMsg:null,
    cacheBuffer:null,
    msgs:{
        get:function () {
            let data = this.cacheMsg;
            this.cacheMsg = [];
            return data;
        }
    },
    init:function () {
        this.cacheMsg = [];
        this.reset();
    },
    decodeAppend:function(data){
        if(null == data){
            return;
        }

        let fullBuffer = null;
        if(null == this.cacheBuffer){
            fullBuffer = data;
        }else{
            // not run code
            fullBuffer = Buffer.alloc(this.cacheBuffer.length + data.length);
            this.cacheBuffer.copy(fullBuffer,0,0,this.cacheBuffer.length);
            data.copy(fullBuffer,this.cacheBuffer.length,0,data.length);
        }
        this.cacheBuffer = null;

        let msgLen = -1;
        let newMsg = null;
        for(let i=0;i<fullBuffer.length;){
            if(msgLen == -1){
                msgLen = fullBuffer[i++];
                msgLen |= fullBuffer[i++];
                if(0 == msgLen){
                    break;
                }
                continue;
            }else{
                if(msgLen+i> fullBuffer.length){
                    // not run code
                    this.cacheBuffer = fullBuffer;
                    break;
                }
                newMsg = Buffer.alloc(msgLen);
                fullBuffer.copy(newMsg,0,i,msgLen+i);
                this.cacheMsg.push(newMsg);
                i+= msgLen;
                msgLen = -1;
            }
        }
    },
    reset:function () {
        this.cacheBuffer = null;
    }
}).Static({
    MAX:64*1024
})