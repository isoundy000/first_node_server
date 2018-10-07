/**
 * Created by Administrator on 2018/9/20.
 */
require("../../../CAppSystem");
require("../../../../protocol/front/CPbSessionStruct");
require("./CRpcMessageHandler");
require("./CMonitorData");
require("./CMonitorServerSystem");

Class({
    ClassName:"App.Server.CMainServer",
    Base:"App.Lib.Server.CBaseServer",
    beforStart:function(name,index,serverCfg){
        App.Server.CMonitorServerSystem.Instance.config(name,serverCfg);
    },
    afterStart:function(){
        App.Server.CRpcMessageHandler.Instance.bind();
    }
}).Static({
    Instance:Core.Instance
})