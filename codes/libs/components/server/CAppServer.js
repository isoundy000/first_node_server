/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Server.CAppServer",
    frontServer:null,
    backServer:null,
    init:function(backHost,backPort,backServerType,
                  frontHost,frontPort,frontServerType){
        this.backServer = App.Lib.Server.CBaseServer.create(backServerType,backHost,backPort);
        if(null!=frontHost && null!=frontPort){
            this.frontServer = App.Lib.Server.CBaseServer.create(frontServerType,frontHost,frontPort);
        }

        var i=0;
        console.warn(arguments[i++]);
        console.warn(arguments[i++]);
        console.warn(arguments[i++]);
        console.warn(arguments[i++]);
        console.warn(arguments[i++]);
        console.warn(arguments[i++]);
    },
    clear:function(){
        if(null!=this.backServer){
            this.backServer.stop();
            this.backServer = null;
        }
        if(null!=this.frontServer){
            this.frontServer.stop();
            this.frontServer = null;
        }
    }
}).Static({
    Instance: Core.Instance
})