/**
 * Created by Administrator on 2018/9/20.
 */
require("../../libs/CAppSystem");
require("../../protocol/front/CPbSessionStruct");
require("./handler/CHandler");
require("./CRpcMessageHandler");

Class({
    ClassName:"App.Server.CMainServer",
    Base:"App.Lib.Server.CBaseServer",
    afterStart:function(){
        App.Server.CRpcMessageHandler.Instance.bind();

        setInterval(function(){
            App.Lib.Rpc.CRpcSystem.Instance.send("Session","sessionToken",{"token":"123"});
        },1000)
    }
}).Static({
    Instance:Core.Instance
})