/**
 * Created by Administrator on 2018/9/13.
 */
var fs = require('fs');
Class({
    ClassName: "App.Lib.Rpc.CRpcSystem",
    Base:"App.Lib.CBaseSystem",
    servers:null,
    id:0,
    cbCaches:null,
    bufferCache:null,
    interval:null,
    init: function () {
        this.servers = {};
        this.cbCaches = {};
        let protocolPath = "protocol/rpc/";
        let rootPath = "../../../";
        let ay = fs.readdirSync(protocolPath);
        let structFile = "CPrcStruct.js";
        require("{0}{1}{2}".Format(rootPath,protocolPath,structFile));
        for(let i=0;i<ay.length;i++){
            require("{0}{1}{2}".Format(rootPath,protocolPath,ay[i]));
        }
    },
    config:function(cfg){
        for(let serverName in cfg){
            let handlers = App.Rpc.CHandler;
            let rpcDatas = this.servers[serverName] = [];
            let ay = cfg[serverName];
            for(let i=0;i<ay.length;i++){
                let rpcData = new App.Lib.Rpc.CRpcData(ay[i],handlers);
                rpcDatas.push(rpcData);
            }
        }
    },
    send:function(){
        let opt,serverName,reqName,msg,cb;
        opt = arguments[0];
        serverName = arguments[1];
        reqName = arguments[2];
        msg = arguments[3];
        cb = arguments[4];

        let index = opt || 0;
        let reqInfo = App.Rpc.CHandler[reqName];
        this.id++;
        if(this.id == 0xffffffff){
            this.id = 1;
        }
        let id = this.id;
        if(null!=cb){
            this.cbCaches[id] = [function(data){
                if(null!=cb){
                    cb(data);
                }
            },false];
        }
        let data = App.Lib.Protocol.CRpcProtoSystem.Instance.encode(id,reqInfo,msg);
        let client = this.servers[serverName][index];
        client.send(data);
    },
    sendSync:function(){
        let opt,serverName,reqName,msg,ret;
        opt = arguments[0];
        serverName = arguments[1];
        reqName = arguments[2];
        msg = arguments[3];
        ret = arguments[4];

        let self = this;
        let index = opt || 0;
        let reqInfo = App.Rpc.CHandler[reqName];
        self.id++;
        if(self.id == 0xffffffff){
            self.id = 1;
        }
        let id = self.id;
        return new Promise((resolve, reject) => {
            self.cbCaches[id] = function(data){
                resolve(data);
            };
            let data = App.Lib.Protocol.CRpcProtoSystem.Instance.encode(id,reqInfo,msg);
            let client = self.servers[serverName][index];
            client.send(data);
        })
    },
    onCallBack:function(id,data){
        if(this.cbCaches.hasOwnProperty(id)){
            let cb = this.cbCaches[id];
            delete this.cbCaches[id];
            cb(data);
        }else{
            console.warn("no have onCallBack:"+id);
        }
    },
    checkBuffer:function(){

    }
}).Static({
    Instance: Core.Instance
})