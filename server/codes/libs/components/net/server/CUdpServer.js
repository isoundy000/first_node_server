/**
 * Created by Administrator on 2018/9/13.
 */
var net = require('dgram');
Class({
    ClassName: "App.Lib.Net.CUdpServer",
    Base:"App.Lib.Net.CBaseNetServer",
    initSocket:function(){
        var self = this;
        self.server = net.createSocket('udp4');
        self.server.bind(this.port);
        // on message
        self.server.on('message', function(data, client){
            client.send = self.send;
            client.server = self.server;
            client.session = client;
            client.id = "{0}_{1}".Format(client.address,client.port)
            self.onClientData(data,client);
        });
        self.server.on('error', function(err){
            console.error('CUdpServer: msg - %s, stack - %s\n', err.message, err.stack);
        });

        self.server.on('listening', function(){
            console.log("CUdpServer: is listening on port:"+self.port);
        })
    },
    send:function(data){
        this.server.send(data, 0, data.length, this.port,this.address);
    },
    stop:function(){
        this.server.close();
        this.server = null;
    }
})