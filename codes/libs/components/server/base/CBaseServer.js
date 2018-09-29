/**
 * Created by Administrator on 2018/9/20.
 */
Class({
    ClassName: "App.Lib.Server.CBaseServer",
    beforStart:function(name,index,serverCfg){
    },
    afterStart:function(){
        App.System.allServerStart();
    },
    start:function(name,index,serverCfg){
        this.beforStart(name,index,serverCfg);
        App.System.init();
        App.System.config(name,index,serverCfg);
        App.System.start();
        if(name!="Monitor"){
            App.Lib.Server.CMonitorClientSystem.Instance.init();
            App.Lib.Server.CMonitorClientSystem.Instance.start();
        }
        this.afterStart();
    }
})

var args = process.argv.splice(2);
if(args.length>0){
    var name = args[0],
        index = args[1],
        serverCfg = JSON.parse(args[2]);

    setTimeout(function(){
        App.Server.CMainServer.Instance.start(name,index,serverCfg)
    },1)
}
