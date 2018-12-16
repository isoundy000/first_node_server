/**
 * Created by Administrator on 2018/9/13.
 */
var net = require('dgram');
Class({
    ClassName: "App.Lib.Net.CUdpClient",
    Base:"App.Lib.Net.CBaseNetClient",
    initSocket:function(){
        var udpClient = net.createSocket('udp4');
        udpClient.on('message',this.onMessage.bind(this) );
        this.scoket = udpClient;
    },
    stop:function(){
        this.scoket.close();
        this.scoket = null;
        App.Lib.Net.CBaseNetClient.prototype.stop.call(this);
    },
    start:function(){
        App.Lib.Net.CBaseNetClient.prototype.start.call(this);
    },
    onMessage:function(data, client){
        if(this.isFrontServer){
            App.Lib.Protocol.CFrontProtoSystem.Instance.onMessage(data,client);
        }else{
            App.Lib.Protocol.CRpcProtoSystem.Instance.onMessage(data,client);
        }
    },
    doSend:function(data,length){
        if(null!=this.scoket){
            this.scoket.send(data, 0, length, this.serverPort, this.serverHost);
        }else{
            console.error("App.Lib.Net.CUdpClient:send socket is null")
        }
    }
})