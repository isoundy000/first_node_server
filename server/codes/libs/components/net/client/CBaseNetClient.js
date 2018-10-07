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
    ctor:function(host,port,connectCb,closeCb){
        this.serverPort = port;
        this.serverHost = host;
        this.connectCallBack = connectCb;
        this.closeCallBack = closeCb;
        this.initSocket();
        console.log("{0}-{1} App.Lib.Net.CBaseNetClient:rpc socket create".Format(App.System.name,this.serverPort))
    },
    initSocket:function(){

    },
    stop:function(){

    },
    send:function(){
        throw "not support";
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