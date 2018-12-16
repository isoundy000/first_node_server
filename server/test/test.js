/**
 * Created by Administrator on 2018/9/19.
 */


function sleep(time = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
};

var helper = {
    testSync:function () {

    }
}
// var test =0;
// var count = 1000*10;
// console.log("start:"+Date.now())
// for(var i=0;i<count;i++){
//     (async () => {
//         await sleep(1000);
//         test++;
//         if(test ==count){
//             console.log(" over:"+Date.now())
//         }
//
//     })();
// }
require("../codes/app")
require("../codes/protocol/rpc/CPrcStruct")
require("../codes/protocol/rpc/CHandler")
// let index = 1000*10;
// let nBuffer = new Buffer(6);
// nBuffer[2]=(index>>24)&0xff;
// nBuffer[3]=(index>>16)&0xff;
// nBuffer[4]=(index>>8)&0xff;
// nBuffer[5]=index&0xff;

let clientData1 = {"name":"acb",num:1};
let clientData2 = {"name":"def",num:2};
let clientData3 = {"name":"ghi",num:3};
var abc = new App.Lib.Net.CNetEncodeBuffer();
abc.init();
index = 1;
let req = App.Rpc.CHandler.serverStart;
let data1 = App.Lib.Protocol.CRpcProtoSystem.Instance.encode(index++,req,clientData1);
let data2 = App.Lib.Protocol.CRpcProtoSystem.Instance.encode(index++,req,clientData2);
let data3 = App.Lib.Protocol.CRpcProtoSystem.Instance.encode(index++,req,clientData3);
console.log(data1);
abc.encodeAppend(data1);
abc.encodeAppend(data2);
abc.encodeAppend(data3);

let len = abc.currentBufferLen;
let buffer = Buffer.alloc(len);
abc.buffer.copy(buffer,0,0,len);


var cba = new App.Lib.Net.CNetDecodeBuffer();
cba.init();
cba.decodeAppend(buffer);
let  msgs = cba.msgs;
App.Lib.Protocol.CRpcProtoSystem.Instance.messageCfg = {
    0:App.Rpc.CHandler.serverStart
}

App.Lib.Protocol.CRpcProtoSystem.Instance.messageNameCfg = {
    0:"serverStart"
}
for(let i=0;i<msgs.length;i++){
    App.Lib.Protocol.CRpcProtoSystem.Instance.onMessage(msgs[i],null);
}
console.log(msgs)
//
// // console.warn("---index:"+index);
// // console.warn(index>>24);
// // console.warn(index>>16);
// // console.warn(index>>8);
// // console.warn(index&0xf);
// //
// // console.warn("---index:"+index);
// // console.warn(0xffff)
// // console.warn(0xff)
// // console.warn(index&0xf000);
// // console.warn(index&0xf00);
// // console.warn(index&0xf0);
// // console.warn(index&0xf);

// console.warn(0xffffffff)