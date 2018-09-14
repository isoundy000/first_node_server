/**
 * Created by Administrator on 2018/9/13.
 */
require("./core/Core");
require("./core/CMapArray");
require("./core/CBaseHelper");

require("./components/session/CSessionData");
require("./components/session/CSessionSystem");

require("./components/agent/CAgentData");
require("./components/agent/CAgentSystem");

require("./components/channel/CChannelData");
require("./components/channel/CChannelSystem");

require("./components/rpc/CRpcData");
require("./components/rpc/CRpcSystem");

require("./components/server/CBaseServer");
require("./components/server/CTcpServer");
require("./components/server/CUdpServer");
require("./components/server/CAppServer");

App.System = {
    name:null,
    server:null,
    serverIndex:0,
    start:function(){
        App.Lib.Session.CSessionSystem.Instance.init();
        App.Lib.Agent.CAgentSystem.Instance.init();
        App.Lib.Channel.CChannelSystem.Instance.init();
    },
    stop:function() {
        App.Lib.Channel.CChannelSystem.Instance.clear();
        App.Lib.Agent.CAgentSystem.Instance.clear();
        App.Lib.Session.CSessionSystem.Instance.clear();
        App.Lib.Server.CAppServer.Instance.clear();
    },
    initServer:function(name,index,cfg){
        this.serverIndex = index;
        this.name = name;
        cfg = cfg[name][index];
        App.Lib.Server.CAppServer.Instance.init(
            cfg.host,cfg.port,cfg.type,
            cfg.front_host,cfg.front_port,cfg.front_type);
    }
}