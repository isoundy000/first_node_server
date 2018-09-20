/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Net.CNetSystem",
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
        console.warn("port is:"+this.cfg.port);
        this.backServer = App.Lib.Net.CBaseNetServer.create(
            this.cfg.type,this.cfg.host,this.cfg.port);
        if(null!=this.cfg.front_type && null!=this.cfg.front_host){
            this.frontServer = App.Lib.Net.CBaseNetServer.create(
                this.cfg.front_type,this.cfg.front_host,this.cfg.front_port);
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
    newClient:function(server,host,port) {
        App.Lib.Session.CSessionSystem.Instance.addSession(server,host,port);
    }
}).Static({
    Instance: Core.Instance
})