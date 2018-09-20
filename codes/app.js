require("./libs/CAppSystem");
var serverCfg = require("../config/servers");
const child_process = require('child_process');

for(var name in serverCfg){
    var servers = serverCfg[name];
    for(var index =0; index<servers.length; index++){

        var file = "servers/{0}/server.js".Format(name);
        var worker_process = child_process.fork(file, [name,index,JSON.stringify(serverCfg)]);
        worker_process.on('close', function (code) {
            console.log('child_process close ' + code);
        });
        //App.System.init();
        //App.System.config(name,index,serverCfg);
        //App.System.start();
    }

}


//for(var key in )
//App.System.clear();
//App.System.stop();