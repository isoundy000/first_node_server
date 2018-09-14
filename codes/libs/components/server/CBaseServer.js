/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Server.CBaseServer",
    port:null,
    host:null,
    server:null,
    ctor:function(host,port){
        this.port = port;
        this.host = host;
        this.initSocket();
        this.server.listen(this.port);

        //�����������¼�
        this.server.on('listening',function(){
            console.log("server listening:" + server.address().port);
        });

        //�����������¼�
        this.server.on("error",function(exception){
            console.log("server error:" + exception);
        });
    },
    stop:function(){
        this.server.stop();
    },
    onNewClient:function(client){
        console.log('connect: ' +
            client.remoteAddress + ':' + client.remotePort);
        client.setEncoding('binary');
        //���յ�����
        client.on('data',function(data){
            console.log('client send:' + data);
        });
        client.write('Hello client!\r\n');
        // client.pipe(client);
        //���ݴ����¼�
        client.on('error',function(exception){
            console.log('socket error:' + exception);
            client.end();
        });
        //�ͻ��˹ر��¼�
        client.on('close',function(data){
            console.log('client closed!');
            // client.remoteAddress + ' ' + client.remotePort);
        });
    }
}).Static({
    create:function(type,host,port) {
        if(type == "udp"){
            return new App.Lib.Server.CUdpServer(host,port);
        }else if(type == "tcp"){
            return new App.Lib.Server.CTcpServer(host,port);
        }
    }
})