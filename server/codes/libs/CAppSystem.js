/**
 * Created by Administrator on 2018/9/13.
 */
require("./core/Core");
require("./core/CMapArray");
require("./core/CBaseHelper");

require("./components/CConfigMisc");
require("./components/CBaseSystem");

require("./components/session/CSessionData");
require("./components/session/CSessionSystem");

require("./components/agent/CAgentData");
require("./components/agent/CAgentSystem");

require("./components/channel/CChannelData");
require("./components/channel/CChannelSystem");

require("./components/filter/CBaseFilter");
require("./components/filter/CDefultFilterKey");
require("./components/filter/CFilterData");
require("./components/filter/CValidLoginFilter");
require("./components/filter/CValidServerFilter");

require("./components/rpc/CRpcData");
require("./components/rpc/CRpcSystem");

require("./components/net/CNetDecodeBuffer");
require("./components/net/CNetEncodeBuffer");
require("./components/net/server/CBaseNetServer");
require("./components/net/server/CTcpServer");
require("./components/net/server/CUdpServer");
require("./components/net/server/CNetServerSystem");
require("./components/net/client/CBaseNetClient");
require("./components/net/client/CTcpClient");
require("./components/net/client/CUdpClient");
require("./components/net/client/CNetClientSystem");

require("./components/server/base/CMonitorClientSystem");
require("./components/server/base/CBaseServer");

require("./components/protocol/CBaseProtoSystem");
require("./components/protocol/CFrontProtoSystem");
require("./components/protocol/CRpcProtoSystem");

require("./components/log/CLogSystem");

App.System = {
    protobuf : require("protobufjs"),
    name:null,
    serverIndex:0,
    init:function(){
        App.Lib.CConfigMisc.Instance.init();
        App.Lib.Session.CSessionSystem.Instance.init();
        App.Lib.Agent.CAgentSystem.Instance.init();
        App.Lib.Channel.CChannelSystem.Instance.init();
        App.Lib.Log.CLogSystem.Instance.init();
        App.Lib.Net.CNetServerSystem.Instance.init();
        App.Lib.Net.CNetClientSystem.Instance.init();
        App.Lib.Protocol.CFrontProtoSystem.Instance.init();
        App.Lib.Protocol.CRpcProtoSystem.Instance.init();
        App.Lib.Rpc.CRpcSystem.Instance.init();
    },
    clear:function(){
        App.Lib.Net.CNetServerSystem.Instance.clear();
        App.Lib.Net.CNetClientSystem.Instance.clear();
        App.Lib.Log.CLogSystem.Instance.clear();
        App.Lib.Session.CSessionSystem.Instance.clear();
        App.Lib.Agent.CAgentSystem.Instance.clear();
        App.Lib.Channel.CChannelSystem.Instance.clear();
        App.Lib.Protocol.CFrontProtoSystem.Instance.clear();
        App.Lib.Protocol.CRpcProtoSystem.Instance.clear();
        App.Lib.Rpc.CRpcSystem.Instance.clear();
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
        App.Lib.Net.CNetServerSystem.Instance.start();
        App.Lib.Net.CNetClientSystem.Instance.start();
        App.Lib.Protocol.CFrontProtoSystem.Instance.start();
        App.Lib.Protocol.CRpcProtoSystem.Instance.start();
        App.Lib.Rpc.CRpcSystem.Instance.start();
    },
    stop:function() {
        App.Lib.Rpc.CRpcSystem.Instance.stop();
        App.Lib.Protocol.CFrontProtoSystem.Instance.stop();
        App.Lib.Protocol.CRpcProtoSystem.Instance.stop();
        App.Lib.Net.CNetClientSystem.Instance.stop();
        App.Lib.Net.CNetServerSystem.Instance.stop();
        App.Lib.Log.CLogSystem.Instance.stop();
        App.Lib.Channel.CChannelSystem.Instance.stop();
        App.Lib.Agent.CAgentSystem.Instance.stop();
        App.Lib.Session.CSessionSystem.Instance.stop();
    },
    config:function(name,index,cfg){
        this.serverIndex = parseInt(index);
        this.name = name;
        var cuurentCfg = cfg[name][index];
        App.Lib.Net.CNetServerSystem.Instance.config(cuurentCfg);
        App.Lib.Rpc.CRpcSystem.Instance.config(cfg);
    },
    allServerStart:function () {

    }
}