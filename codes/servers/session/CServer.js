/**
 * Created by Administrator on 2018/9/20.
 */
require("../../libs/CAppSystem");
require("../../protocol/front/CPbSessionStruct");
require("./handler/CHandler");
require("./CFrontMessageHandler");
require("./CRpcMessageHandler");

Class({
    ClassName:"App.Server.CMainServer",
    Base:"App.Lib.Server.CBaseServer",
    afterStart:function(){
        App.Server.CFrontMessageHandler.Instance.bind();
        App.Server.CRpcMessageHandler.Instance.bind();
    }
}).Static({
    Instance:Core.Instance
})