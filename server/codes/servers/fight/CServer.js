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
        setTimeout(function () {
            let startTime = Date.now();
            let end = 10*1000;
            let current = 0;
            (async ()=>{
                for(let i=0;i<end;i++){
                    let ret =  await App.Lib.Rpc.CRpcSystem.Instance.sendSync(null,"Session","sessionToken",{"token":"123"});
                    current++;
                    if(current == end){
                        console.warn("over:{0}".Format(Date.now()-startTime))
                    }
                }
            })()

        },1000*1)
    }
}).Static({
    Instance:Core.Instance
})