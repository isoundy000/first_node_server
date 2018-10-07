/**
 * Created by Administrator on 2018/9/13.
 */
var net = require('net');
Class({
    ClassName: "App.Lib.Net.CTcpServer",
    Base:"App.Lib.Net.CBaseNetServer",
    initSocket:function(){
        let self = this;
        self.server = net.createServer(self.onNewClient.bind(self));
        self.server.listen(this.port);
        //
        self.server.on('listening',function(){
            console.log("CTcpServer listening:" + self.server.address().port);
        });

        //
        self.server.on("error",function(exception){
            console.error("CTcpServer error:" + exception);
        });
    },
    onNewClient:function(client){
        let self = this;
        console.info('CTcpServer new client: ' + client.remoteAddress + ':' + client.remotePort);
        client.setEncoding('binary');
        //
        client.on('data',function(data){
            if(self.isFrontServer){
                App.Lib.Protocol.CFrontProtoSystem.Instance.onMessage(new Buffer(data),client.session);
            }else{
                App.Lib.Protocol.CRpcProtoSystem.Instance.onMessage(new Buffer(data),client.session);
            }
        });
        //
        client.on('error',function(exception){
            console.error('CTcpServer client error:' + exception);
        });
        //
        client.on('close',function(data){
            console.log('CTcpServer client closed! ' + JSON.stringify(data));
            App.Lib.Net.CNetServerSystem.Instance.removeClient(
                client,client.remoteAddress,client.remotePort);
        });
        App.Lib.Net.CNetServerSystem.Instance.newClient(
            client,client.remoteAddress,client.remotePort,self.isFrontServer);
    },
    removeClient:function(client){
        client.destroy();
    },
    stop:function(){
        this.server.close();
        this.server = null;
    }
})