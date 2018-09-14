/**
 * Created by Administrator on 2018/9/13.
 */
var net = require('net');
Class({
    ClassName: "App.Lib.Server.CTcpServer",
    Base:"App.Lib.Server.CBaseServer",
    initSocket:function(){
        var self = this;
        this.server = net.createServer(this.onNewClient.bind(this));
    },
    stop:function(){

    }
})