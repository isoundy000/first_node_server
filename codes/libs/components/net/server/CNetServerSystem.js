/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Net.CNetServerSystem",
    Base:"App.Lib.CBaseSystem",
    frontServer:null,
    backServer:null,
    cfg:null,
    clear:function(){
       this.cfg = null;
    },
    config:function(cfg){
        this.cfg = cfg;
    },
    start:function(){
        this.backServer = App.Lib.Net.CBaseNetServer.create(
            this.cfg.type,this.cfg.host,this.cfg.port,false);
        if(null!=this.cfg.front_type && null!=this.cfg.front_host){
            this.frontServer = App.Lib.Net.CBaseNetServer.create(
                this.cfg.front_type,this.cfg.front_host,this.cfg.front_port,true);
            console.info("{0}_server front_port:{1}".Format(App.System.name,this.cfg.front_port))
        }
    },
    stop:function(){
        if(null!=this.backServer){
            this.backServer.stop();
            this.backServer = null;
        }
        if(null!=this.frontServer){
            this.frontServer.stop();
            this.frontServer = null;
        }
    },
    newClient:function(client,host,port,isFront) {
        App.Lib.Session.CSessionSystem.Instance.addSession(client,host,port,isFront);
    },
    removeClient:function (client,host,port) {
        App.Lib.Session.CSessionSystem.Instance.removeSession(client,host,port);
    }
}).Static({
    Instance: Core.Instance
})