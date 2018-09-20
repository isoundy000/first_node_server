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
        self.server.on('message', function(msg, rinfo){
            console.log("CUdpServer msg:{0},{1}".Format(JSON.stringify(msg),JSON.stringify(rinfo)))
        });
        self.server.on('error', function(err){
            console.info('CUdpServer: msg - %s, stack - %s\n', err.message, err.stack);
        });

        self.server.on('listening', function(){
            console.info("CUdpServer: is listening on port:"+self.port);
        })
    },
    stop:function(){
        this.server.close();
        this.server = null;
    }
})