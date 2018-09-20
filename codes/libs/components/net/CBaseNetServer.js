/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Net.CBaseNetServer",
    port:null,
    host:null,
    server:null,
    ctor:function(host,port){
        this.port = port;
        this.host = host;
        this.initSocket();
    },
    initSocket:function(){

    },
    stop:function(){

    }
}).Static({
    create:function(type,host,port) {
        if("udp" == type){
            return new App.Lib.Net.CUdpServer(host,port);
        }else if(void 0 == type || "" == type ||  "tcp" == type){
            return new App.Lib.Net.CTcpServer(host,port);
        }
    }
})