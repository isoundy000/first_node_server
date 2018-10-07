/**
 * Created by Administrator on 2018/6/21.
 */
Class({
    ClassName:"Game.Net.CSocket",
    state:0,
    ws:null,
    isOpened:function()
    {
        return this.state==1;
    },
    init:function()
    {

    },
    onServerPushMsg:function(msg)
    {

    },
    connect:function(ip,port,protocol,cb)
    {
        if(this.ws){
            console.log("more socket");
            return;
        }
        let ws = new WebSocket(protocol+"://"+ip+":"+port);
        this.ws = ws;
        let self = this;
        ws.onopen = function()
        {
            self.onOpen();
            cb();
            console.warn("connect " + ip + ":" + port + " ok");
        };

        ws.onclose = function()
        {
            self.ws = null;
            self.onClose();
            // 关闭 websocket
            Core.Assert(false,"连接已关闭...");
        }
        ws.onerror = function (evt)
        {
            let received_msg = evt.data;
            Core.Assert(false,"数据已出错...");
        };
        ws.onmessage = function (evt)
        {
            let received_msg = evt.data;
            console.warn("newMsg:"+received_msg);
            let msg = JSON.parse(received_msg);
            let protocolName = Object.keys(msg)[0];
            let data =msg[protocolName];
            if(data.hasOwnProperty('id')){
                let msgIdx = data.id;
                let infos = self.cacheMsgId[msgIdx];
                delete self.cacheMsgId[msgIdx];
                Server.onmessage(data,infos[1],infos[2],infos[0], infos[4],infos[3]);
            }else{
                let protocolName = Object.keys(msg)[0];
                self.onmessage(protocolName,data);
            }
            //alert("数据已接收...");
        };
    },
    disconnect:function()
    {
        if(this.isOpened())
        {
            if(null!=this.ws)
            {
                this.ws.close();
                this.ws = null;
            }
            this.onClose();
        }
    },

    send:function(route,vMap,id,payloadName,cb,notify)
    {
        if(this.state == 1)
        {
            console.warn(payloadName);
            let sendValue = {};
            sendValue[route] = vMap;
            let msgIdx = ++this.idFlag;
            vMap.id  = msgIdx+"";
            this.cacheMsgId[msgIdx] = [vMap,id,payloadName,cb,notify];
            let str = JSON.stringify(sendValue);
            console.warn("send:"+str);
            this.ws.send(str);
        }
        else{
            Server.onfaildsend(notify);
        }
    },
    onmessage:function(key,data)
    {
        data.ID = key;
        data.payloadName = key;
        data.timestamp?0:data.timestamp = 0;
        Client.dispatch(data, null);
        delete data.ID;
        delete data.payloadName;
        delete data.timestamp;
    },
    ondisconnect:function(msg)
    {
        if(msg.code != 1)
        {
            Server.ondisconnect();
        }
    },
    onerror:function()
    {

    },
    onClose:function()
    {
        this.state = 0;
    },
    onOpen:function()
    {
        this.state = 1;
    }
}).Static({
    Instance:Core.Instance
})