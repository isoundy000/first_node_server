
Class({
    ClassName:"App.Server.CMonitorServerSystem",
    servers:null,
    config:function(name,cfg){
        this.servers = {};
        for(let serverName in cfg){
            if(name == serverName){
                continue;
            }
            let ay = this.servers[serverName] = [];
            let ayCfg = cfg[serverName];
            for(let i=0;i<ayCfg.length;i++){
                let monitor = new App.Server.CMonitorData(serverName,i);
                ay.push(monitor);
            }
        }
    },
    onServerStart:function (name,index) {
        if(!this.servers.hasOwnProperty(name)){
            console.error("App.Server.CMonitorServerSystem not have server:{0}".Format(name));
            return;
        }
        let data = this.servers[name][index];
        if(null == data){
            console.error("App.Server.CMonitorServerSystem not have server:{0} index:{1}".Format(name,index));
            return;
        }
        data.isWorking = true;
        this.checkAllStart();
    },
    checkAllStart:function () {
        for(let serverName in this.servers){
            let ay = this.servers[serverName];
            for(let i=0;i<ay.length;i++){
                if(!ay[i].isWorking){
                    return;
                }
            }
        }
        for(let serverName in this.servers){
            let ay = this.servers[serverName];
            for(let i=0;i<ay.length;i++){
                App.Lib.Rpc.CRpcSystem.Instance.send(i,serverName,"allServerStart");
            }
        }
    }
}).Static({
    Instance:Core.Instance
})