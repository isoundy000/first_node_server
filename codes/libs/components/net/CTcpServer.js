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
        //�����������¼�
        self.server.on('listening',function(){
            console.info("CTcpServer listening:" + self.server.address().port);
        });

        //�����������¼�
        self.server.on("error",function(exception){
            console.info("CTcpServer error:" + exception);
        });
    },
    onNewClient:function(client){
        console.log('CTcpServer new client: ' + client.remoteAddress + ':' + client.remotePort);
        client.setEncoding('binary');
        //���յ�����
        client.on('data',function(data){
            console.log('CTcpServer client received:' + data);client.destroy();
        });
        // client.pipe(client);
        //���ݴ����¼�
        client.on('error',function(exception){
            console.log('CTcpServer client error:' + exception);

        });
        //�ͻ��˹ر��¼�
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