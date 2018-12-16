/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Net.CBaseNetServer",
    port:null,
    host:null,
    server:null,
    isFrontServer:null,
    buffCache:null,
    ctor:function(host,port,isFrontServer){
        this.port = port;
        this.host = host;
        this.isFrontServer = isFrontServer;
        this.buffCache = {};
        this.initSocket();
    },
    initSocket:function(){

    },
    stop:function(){
        this.buffCache = {};
    },
    onClientData:function(data,client){
        if(this.isFrontServer){
            App.Lib.Protocol.CFrontProtoSystem.Instance.onMessage(data,client.session);
        }else{
            this.onBackendMsg(data,client);
        }
    },
    onBackendMsg:function (data,client) {
        if(0 !== App.Lib.CConfigMisc.Instance.config.rpc_interval){
            let id = client.id;
            let bufferCache = this.buffCache[id];
            if(null == bufferCache){
                bufferCache = new App.Lib.Net.CNetDecodeBuffer();
                bufferCache.init();
                this.buffCache[id] = bufferCache;
            }
            bufferCache.decodeAppend(data);
            let msgs = bufferCache.msgs;
            if(msgs){
                for(let i=0;i<msgs.length;i++){
                    App.Lib.Protocol.CRpcProtoSystem.Instance.onMessage(msgs[i],client.session);
                }
            }
        }else{
            App.Lib.Protocol.CRpcProtoSystem.Instance.onMessage(data,client.session);
        }
    }
}).Static({
    create:function(type,host,port,isFrontServer) {
        if("udp" == type){
            return new App.Lib.Net.CUdpServer(host,port,isFrontServer);
        }else if(void 0 == type || "" == type ||  "tcp" == type){
            return new App.Lib.Net.CTcpServer(host,port,isFrontServer);
        }
    }
})