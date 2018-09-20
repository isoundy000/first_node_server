/**
 * Created by Administrator on 2018/9/13.
 */
var net = require('net');
Class({
    ClassName: "App.Lib.Net.CTcpServer",
    Base:"App.Lib.Net.CBaseNetServer",
    initSocket:function(){
        var self = this;
        self.server = net.createServer(self.onNewClient.bind(self));
        self.server.listen(this.port);
        //服务器监听事件
        self.server.on('listening',function(){
            console.info("CTcpServer listening:" + self.server.address().port);
        });

        //服务器错误事件
        self.server.on("error",function(exception){
            console.info("CTcpServer error:" + exception);
        });
    },
    onNewClient:function(client){
        console.log('CTcpServer new client: ' + client.remoteAddress + ':' + client.remotePort);
        client.setEncoding('binary');
        //接收到数据
        client.on('data',function(data){
            console.log('CTcpServer client received:' + data);client.destroy();
        });
        // client.pipe(client);
        //数据错误事件
        client.on('error',function(exception){
            console.log('CTcpServer client error:' + exception);

        });
        //客户端关闭事件
        client.on('close',function(data){
            console.log('CTcpServer client closed! ' + JSON.stringify(data));
            // client.remoteAddress + ' ' + client.remotePort);
        });
        App.Lib.Server.CAppServerSystem.Instance.newClient(
            client,client.remoteAddress,client.remotePort);
    },
    removeClient:function(client){
        client.destroy();
    },
    stop:function(){
        this.server.close();
        this.server = null;
    }
})