require("./libs/CAppSystem");
var serverCfg = require("../config/servers");
App.System.start();
var name = "game_server";
var index = 0;
App.System.initServer(name,index,serverCfg);
