/**
 * Created by Administrator on 2018/9/22.
 */
Class({
    ClassName: "App.Lib.Net.CBaseNetClient",
    serverPort:null,
    serverHost:null,
    socket:null,
    connectCallBack:null,
    closeCallBack:null,
    interval:null,
    bufferCache:null,
    ctor:function(host,port,connectCb,closeCb){
        this.serverPort = port;
        this.serverHost = host;
        this.connectCallBack = connectCb;
        this.closeCallBack = closeCb;
        if(0 !== App.Lib.CConfigMisc.Instance.config.rpc_interval){
            this.bufferCache = new App.Lib.Net.CNetEncodeBuffer();
        }
        this.initSocket();
        console.log("{0}-{1} App.Lib.Net.CBaseNetClient:rpc socket create".Format(App.System.name,this.serverPort))
    },
    initSocket:function(){

    },
    start:function(){
        if(null !=this.bufferCache){
            this.bufferCache.init();
        }
        this.startTimer();
    },
    stop:function(){
        this.stopTimer();
        if(null !=this.bufferCache){
            this.bufferCache.reset();
        }
    },
    startTimer:function(){
        if(0 === App.Lib.CConfigMisc.Instance.config.rpc_interval){
            return;
        }
        let t = App.Lib.CConfigMisc.Instance.config.rpc_interval;
        if(void 0 == t){
            t = 10;
        }
        if(t>0){
            this.interval = setInterval(this.checkBuffer,t,this);
        }
    },
    stopTimer:function(){
        if(null != this.interval){
            clearInterval(this.interval);
            this.interval = null;
        }
    },
    send:function(data){
        if(null == this.interval){
            this.doSend(data,data.length);
        }else{
            this.sendBuffer(data);
        }
    },
    doSend:function(data){
        throw "not support";
    },
    sendBuffer:function(buffer){
        if(!this.bufferCache.encodeAppend(buffer)){
            let  len = this.bufferCache.currentBufferLen;
            this.doSend(this.bufferCache.buffer,len);
            this.sendBuffer(buffer);
        }
    },
    checkBuffer:function () {
        if(!this.bufferCache.isEmpty){
            let  len = this.bufferCache.currentBufferLen
            this.doSend(this.bufferCache.buffer,len);
        }
    }
}).Static({
    create:function(type,host,port,connectCb,closeCb) {
        if("udp" == type){
            return new App.Lib.Net.CUdpClient(host,port,connectCb,closeCb);
        }else if(void 0 == type || "" == type ||  "tcp" == type){
            return new App.Lib.Net.CTcpClient(host,port,connectCb,closeCb);
        }
    }
})