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
        // setTimeout(function () {
        //     let startTime = Date.now();
        //     let end = 1*1;
        //     let current = 0;
        //     for(let i=0;i<end;i++){
        //         (async ()=>{
        //             let ret = {};
        //             await App.Lib.Rpc.CRpcSystem.Instance.sendSync(null,"Session","sessionToken",{"token":"123"},ret);
        //             // console.warn("back return value:{0}".Format(JSON.stringify(ret.value)))
        //             current++;
        //             if(current == end){
        //                 console.warn("over:{0}".Format(Date.now()-startTime))
        //             }
        //         })()
        //     }
        // },1000*10)
    }
}).Static({
    Instance:Core.Instance
})