/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Channel.CChannelSystem",
    Base:"App.Lib.CBaseSystem",
    globaleChannel:null,
    channels:null,
    init: function () {
        this.globaleChannel = new App.Lib.Channel.CChannelData("globaleChannel",true);
        this.channels = {
            "globaleChannel":this.globaleChannel
        };
    },
    clear: function () {
        this.globaleChannel.sessions.RemoveAll();
        this.channels = {
            "globaleChannel":this.globaleChannel
        };
    },
    forceGetChannel:function(name) {
        if(this.channels.hasOwnProperty(name)){
            return this.channels[name];
        }
        var channel = new App.Lib.Channel.CChannelData(name,false);
        this.channels[name] = channel;
        return channel;
    },
    forceRemoveChannel:function(name) {
        if(!this.channels.hasOwnProperty(name)){
            throw "App.Lib.Channel.CChannelSystem not have channel:"+channelName;
            return;
        }
        var channel = this.channels[name];
        delete this.channels[name];
        channel.sessions.RemoveAll(true);
    },
    addAgent:function(channelName,agentData){
        var channel = this.forceGetChannel(channelName);
        channel.sessions.InsertValue(agentData.id,agentData);
    },
    removeAgent:function(channelName,agentData){
        var channel = this.channels[name];
        if(!channel){
            throw "App.Lib.Channel.CChannelSystem not have channel:"+channelName;
            return;
        }
        channel.sessions.RemoveValue(agentData.id);
        if(0 === channel.sessions.Ay.length && !channel.alwaysExist){
            this.forceRemoveChannel(channelName);
        }
    },
    pushInfo:function(channelData,msg) {
    }
}).Static({
    Instance: Core.Instance
})