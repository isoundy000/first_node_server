/**
 * Created by user on 2018/9/29.
 */
require("./CAppSystem");
const child_process = require('child_process');

(function(){
    //
    let serverCfg = require("../../config/servers");
    let serverName = "Monitor";
    let monitorCfg = require("../../config/monitor");
    serverCfg[serverName] = [monitorCfg];

    let file = "./libs/components/server/monitor/CServer.js";
    let worker_process = child_process.fork(file, [serverName,0,JSON.stringify(serverCfg)]);
    worker_process.on('close', function (code) {
        console.log('monitor child_process close ' + code);
    });

    for(let serverName in serverCfg){
        let servers = serverCfg[serverName];
        if(serverName == "Monitor"){
            continue;
        }
        for(let index =0; index<servers.length; index++){
            let file = "../codes/servers/{0}/CServer.js".Format(serverName);
            let worker_process = child_process.fork(file, [serverName,index,JSON.stringify(serverCfg)]);
            worker_process.on('close', function (code) {
                console.log('child_process close ' + code);
            });
        }
    }
})()