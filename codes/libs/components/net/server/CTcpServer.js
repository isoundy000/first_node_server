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
            console.log("CTcpServer listening:" + self.server.address().port);
        });

        //�����������¼�
        self.server.on("error",function(exception){
            console.error("CTcpServer error:" + exception);
        });
    },
    onNewClient:function(client){
        var self = this;
        console.info('CTcpServer new client: ' + client.remoteAddress + ':' + client.remotePort);
        client.setEncoding('binary');
        //���յ�����
        client.on('data',function(data){
            if(this.isFrontServer){
                App.Lib.Protocol.CFrontProtoSystem.Instance.onMessage(new Buffer(data),client);
            }else{
                App.Lib.Protocol.CRpcProtoSystem.Instance.onMessage(new Buffer(data),client);
            }
        });
        // client.pipe(client);
        //���ݴ����¼�
        client.on('error',function(exception){
            console.error('CTcpServer client error:' + exception);
        });
        //�ͻ��˹ر��¼�
        client.on('close',function(data){
            console.log('CTcpServer client closed! ' + JSON.stringify(data));
            // client.remoteAddress + ' ' + client.remotePort);
        });
        App.Lib.Net.CNetServerSystem.Instance.newClient(
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