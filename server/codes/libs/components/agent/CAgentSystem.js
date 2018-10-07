/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Agent.CAgentSystem",
    Base:"App.Lib.CBaseSystem",
    agents:null,
    init: function () {
        this.agents = {};
    },
    clear: function () {
        this.agents = {};
    },
    addAgent:function(id,session){
        if(this.agents.hasOwnProperty(id)){
            throw "App.Lib.Agent.CAgentSystem add id more times:"+id;
            return;
        }
        var agent = new App.Lib.Agent.CAgentData(id,session);
        this.agents[id] = agent;
        return agent;
    },
    removeAgent:function(id){
        if(!this.agents.hasOwnProperty(id)){
            throw "App.Lib.Agent.CAgentSystem remove no id :"+id;
            return;
        }
        delete this.agents[id];
    }
}).Static({
    Instance: Core.Instance
})