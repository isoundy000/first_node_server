/**
 * Created by Administrator on 2018/9/13.
 */
require("./core/Core");
require("./core/CMapArray");
require("./core/CBaseHelper");

require("./components/CBaseSystem");

require("./components/session/CSessionData");
require("./components/session/CSessionSystem");

require("./components/agent/CAgentData");
require("./components/agent/CAgentSystem");

require("./components/channel/CChannelData");
require("./components/channel/CChannelSystem");

require("./components/rpc/CRpcData");
require("./components/rpc/CRpcSystem");

require("./components/net/CBaseNetServer");
require("./components/net/CTcpServer");
require("./components/net/CUdpServer");
require("./components/net/CNetSystem");

require("./components/server/CBaseServer");

require("./components/protocol/CProtoSystem");

require("./components/log/CLogSystem");

App.System = {
    protobuf : require("protobufjs"),
    name:null,
    server:null,
    serverIndex:0,
    init:function(){
        App.Lib.Session.CSessionSystem.Instance.init();
        App.Lib.Agent.CAgentSystem.Instance.init();
        App.Lib.Channel.CChannelSystem.Instance.init();
        App.Lib.Log.CLogSystem.Instance.init();
        App.Lib.Net.CNetSystem.Instance.init();
    },
    clear:function(){
        App.Lib.Net.CNetSystem.Instance.clear();
        App.Lib.Log.CLogSystem.Instance.clear();
        App.Lib.Session.CSessionSystem.Instance.clear();
        App.Lib.Agent.CAgentSystem.Instance.clear();
        App.Lib.Channel.CChannelSystem.Instance.clear();
    },
    start:function(){
        if(null == this.name){
            throw "App.System must config befor";
            return;
        }
        App.Lib.Session.CSessionSystem.Instance.start();
        App.Lib.Agent.CAgentSystem.Instance.start();
        App.Lib.Channel.CChannelSystem.Instance.start();
        App.Lib.Log.CLogSystem.Instance.start();
        App.Lib.Net.CNetSystem.Instance.start();
    },
    stop:function() {
        App.Lib.Session.CSessionSystem.Instance.stop();
        App.Lib.Agent.CAgentSystem.Instance.stop();
        App.Lib.Channel.CChannelSystem.Instance.stop();
        App.Lib.Log.CLogSystem.Instance.stop();
        App.Lib.Net.CNetSystem.Instance.stop();
    },
    config:function(name,index,cfg){
        this.serverIndex = index;
        this.name = name;
        cfg = cfg[name][index];
        App.Lib.Net.CNetSystem.Instance.config(cfg);
    }
}