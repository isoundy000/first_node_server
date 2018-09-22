/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Net.CBaseNetServer",
    port:null,
    host:null,
    server:null,
    isFrontServer:null,
    ctor:function(host,port,isFrontServer){
        this.port = port;
        this.host = host;
        this.isFrontServer = isFrontServer;
        this.initSocket();
    },
    initSocket:function(){

    },
    stop:function(){

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