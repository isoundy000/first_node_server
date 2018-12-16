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
    forceGetChannel:function(channelName) {
        if(this.channels.hasOwnProperty(channelName)){
            return this.channels[channelName];
        }
        var channel = new App.Lib.Channel.CChannelData(channelName,false);
        this.channels[channelName] = channel;
        return channel;
    },
    forceRemoveChannel:function(channelName) {
        if(!this.channels.hasOwnProperty(channelName)){
            throw "App.Lib.Channel.CChannelSystem not have channel:"+channelName;
            return;
        }
        let channel = this.channels[channelName];
        delete this.channels[channelName];
        channel.sessions.RemoveAll(true);
    },
    addAgent:function(channelName,agentData){
        var channel = this.forceGetChannel(channelName);
        channel.sessions.InsertValue(agentData.id,agentData);
    },
    removeAgent:function(channelName,agentData){
        let channel = this.channels[channelName];
        if(!channel){
            throw "App.Lib.Channel.CChannelSystem not have channel:"+channelName;
            return;
        }
        channel.sessions.RemoveValue(agentData.id);
        if(0 === channel.sessions.Ay.length && !channel.alwaysExist){
            this.forceRemoveChannel(channelName);
        }
    },
    pushInfo:function(channelName,msg) {
        let channel = this.channels[channelName];
        if(!channel){
            return;
        }
        let ay = channel.sessions.Ay;
        for(let i=0;i<ay.length;i++){
            ay[i].session.send(msg);
        }
    }
}).Static({
    Instance: Core.Instance
})