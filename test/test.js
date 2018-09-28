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

let index = 1000*10;
let nBuffer = new Buffer(6);
nBuffer[2]=(index>>24)&0xff;
nBuffer[3]=(index>>16)&0xff;
nBuffer[4]=(index>>8)&0xff;
nBuffer[5]=index&0xff;

console.warn(nBuffer);
let id2 = nBuffer[2]<<24 | nBuffer[3]<<16 | nBuffer[4]<<8 | nBuffer[5];
console.warn("id2 is:"+id2);
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