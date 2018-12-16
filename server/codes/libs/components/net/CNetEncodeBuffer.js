Class({
    ClassName: "App.Lib.Net.CNetEncodeBuffer",
    cache:null,
    currentBufferLen:0,
    buffer:{
        get:function () {
            let data = this.cache;
            this.reset();
            return data;
        }
    },
    isEmpty:{
        get:function () {
            return 0 == this.currentBufferLen;
        }
    },
    init:function () {
        this.reset();
    },
    encodeAppend:function (buffer) {
        let newBufferLen = buffer.length;
        if(newBufferLen + 2 + this.currentBufferLen< this.constructor.MAX){
            this.cache[this.currentBufferLen++] = (newBufferLen>>8) & 0xff;
            this.cache[this.currentBufferLen++] = newBufferLen & 0xff;
            buffer.copy(this.cache,this.currentBufferLen,0,newBufferLen);
            this.currentBufferLen += newBufferLen;
            return true;
        }
        return false;
    },
    reset:function () {
        this.cache = Buffer.alloc(this.constructor.MAX);
        this.currentBufferLen = 0;
    }
}).Static({
    MAX:64*1024
})