/**
 * Created by Administrator on 2018/9/13.
 */
var net = require('net');
Class({
    ClassName: "App.Lib.Net.CTcpClient",
    Base:"App.Lib.Net.CBaseNetClient",
    initSocket:function(){
        var tcpClient = net.Socket();
        tcpClient.setEncoding('binary');
        this.socket = tcpClient;
    },
    stop:function(){
        this.socket.close();
        this.socket = null;
    },
    start:function(){
        console.warn("CTcpClient connect")
        this.socket.connect(this.serverPort, this.serverHost, this.onConnect.bind(this));
        this.socket.on('data', this.onMessage.bind(this));
        this.socket.on('close',this.onClose.bind(this) );
    },
    onConnect:function(){
        if(null != this.connectCallBack){
            this.connectCallBack();
        }
    },
    onMessage:function(data){
        console.log('recv %s(%d) from server\n', msg, msg.length);
    },
    onClose:function(){
        console.log("client close")
    },
    send:function(data){
        if(null!=this.scoket){
            this.socket.write(data);
        }else{
            console.error("App.Lib.Net.CTcpClient:send socket is null")
        }
    }
})