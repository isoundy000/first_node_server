/**
 * Created by Administrator on 2018/9/13.
 */
var fs = require('fs');
Class({
    ClassName: "App.Lib.Rpc.CRpcSystem",
    Base:"App.Lib.CBaseSystem",
    servers:null,
    init: function () {
        this.servers = {};
        var protocolPath = "protocol/rpc/";
        var rootPath = "../../../";
        var ay = fs.readdirSync(protocolPath);
        var structFile = "CPrcStruct.js";
        require("{0}{1}{2}".Format(rootPath,protocolPath,structFile));
        for(var i=0;i<ay.length;i++){
            require("{0}{1}{2}".Format(rootPath,protocolPath,ay[i]));
        }
    },
    config:function(cfg){
        for(var serverName in cfg){
            var handlers = App.Rpc.CHandler;
            var rpcDatas = this.servers[serverName] = [];
            var ay = cfg[serverName];
            for(var i=0;i<ay.length;i++){
                var rpcData = new App.Lib.Rpc.CRpcData(ay[i],handlers);
                rpcDatas.push(rpcData);
            }
        }
    },
    start:function(){
    },
    send:function(){
        var opt,serverName,reqName,msg;
        if(arguments.length == 4){
            opt = arguments[0];
            serverName = arguments[1];
            reqName = arguments[2];
            msg = arguments[3];
        }else if(arguments.length == 3){
            serverName = arguments[0];
            reqName = arguments[1];
            msg = arguments[2];
        }else{
            throw "App.Lib.Rpc.CRpcSystem send arguments error";
            return;
        }
        var index = 0;
        var data = App.Lib.Protocol.CRpcProtoSystem.Instance.encode(App.Rpc.CHandler[reqName],msg);
        var client = this.servers[serverName][index];
        client.send(data);
    }

}).Static({
    Instance: Core.Instance
})