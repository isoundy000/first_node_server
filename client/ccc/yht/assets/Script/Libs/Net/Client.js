Core.$Defines("Client")({
    onsent: null,
    onrecv:null,

    m_pMsgHanders:null,
    m_pMsgConfig:null,
    onservererror:function(code)
    {
        alert("server error back:"+code);
    },
    init:function(protocol) {
        this.m_pMsgHanders = {};
        this.m_pMsgConfig = {};
        var f = protocol;
        var l;
        for (var g = 0; g < f.length; g++) {
            l = f[g];

            if (!l.id || !l.name) throw "protocol error.";
            if(this.m_pMsgConfig[l.id] ) throw "protocol double defined:"+l.id;
            if(this.m_pMsgHanders[l.name] ) throw "protocol double defined:"+l.name;

            this.m_pMsgConfig[l.id] = l.name;
            this.m_pMsgHanders[l.name] = [];
        }
        console.log("client init over");

    },
    addmap:function(key,target,cb)
    {
        if(!this.m_pMsgHanders[key] ) throw "not find protocol name:"+key;
        cb = cb || target[key];
        if(!cb ) throw "not find protocol function:"+key;
        var ay = this.m_pMsgHanders[key];
        //for(var i=0;i<ay.length;i++)
        //{
        //    var info = ay[i];
        //    if(info[0] == cb || info[1] == target)
        //    {
        //        throw "protocol added befor:"+key;
        //    }
        //}
        ay.push([cb,target]);
    },
    removemap:function(key,target,cb)
    {
        if(!this.m_pMsgHanders[key] ) throw "not find protocol name:"+key;
        cb = cb || target[key];
        if(!cb ) throw "not find protocol function:"+key;
        var ay = this.m_pMsgHanders[key];
        for(var i=0;i<ay.length;i++)
        {
            var info = ay[i];
            if(info[0] == cb && info[1]==target)
            {
                ay.splice(i,1);
                return;
            }
        }
        throw "not find protocol function:"+key;
    },

    dispatch:function(back,send)
    {
        var id = back.ID,name=this.m_pMsgConfig[back.ID], ay = this.m_pMsgHanders[name],dt=back.timestamp;
        for(var i=0;i<ay.length;i++)
        {
            var info = ay[i];
            info[0].call(info[1],back,send,dt);
        }


    }
});