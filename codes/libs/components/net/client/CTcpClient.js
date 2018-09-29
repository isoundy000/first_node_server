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
        var socket = this.socket;
        this.socket = null;
        if(null!=socket){
            socket.close();
        }
    },
    start:function(){
        this.socket.on('data', this.onMessage.bind(this));
        this.socket.on('close',this.onClose.bind(this) );
        this.socket.on('error',this.onError.bind(this) );
        this.reconnect();
    },
    reconnect:function(){
        if(null == this.socket ){
            return;
        }
        this.socket.connect(this.serverPort, this.serverHost, this.onConnect.bind(this));
    },
    onConnect:function(){
        if(null != this.connectCallBack){
            this.connectCallBack();
        }
        console.log("{0}-{1} App.Lib.Net.CTcpClient:rpc socket onConnect".Format(App.System.name,this.serverPort))
    },
    onMessage:function(data){
        console.log('recv %s(%d) from server\n', msg, msg.length);
    },
    onClose:function(){
        this.reconnect();
    },
    onError:function(){
        console.log("{0}:App.Lib.Net.CTcpClient client onError".Format(App.System.name))
    },
    send:function(data){
        if(null != this.socket){
            this.socket.write(data);
        }else{
            console.error("{0}-{1} App.Lib.Net.CTcpClient:send socket is null".Format(App.System.name,this.serverPort))
        }
    }
})