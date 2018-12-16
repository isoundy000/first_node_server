Core.$Defines("Server")({
    __send: function(h,r, c, b, d,notify) {
        this[b] = function() {
            /// 回调函数
            var cb=null;
            var i = arguments[0] instanceof Object && (arguments[0].t && arguments[0].cb) ? (cb=arguments[0],1):0;
            for (var e = {},
                     f = 0; f < d.length; f++) e[d[f]] = arguments.length < f ? null: arguments[f+i] ;
            if (d.length != arguments.length-i) throw "Message " + b + " arguments error. parameters is too short or too long.";

            this.sendmsg(h,r,e,c,b,cb,notify);


        }
    },

    init:function(protocol)
    {
        var f = protocol;
        var k,l;
        for (var g = 0; g < f.length; g++) {
            l = f[g];
            cc.assert( l.id && l.name, "protocol error.");
            cc.assert(!this.hasOwnProperty(l.name), l.name + " protocol has defined.");
            k = l.parameters ;
            this.__send(l.id, k)
        }
        cc.log("server inited")
    },
    onfaildsend:function(notify)
    {
        if (!notify &&  Client.onrecv) Client.onrecv(null,notify );
        console.log("server-onfaildsend");
    },
    sendmsg:function(h,r,a,i,n,cb,notify)
    {
        if (!notify && Client.onsent) Client.onsent(e,notify );
        Game.Net.CWebSocket.Instance.Send(r,a,i,n,cb,notify);
    },
    //  data id payloadName send notify cb
    onmessage:function(c,i,n,r,notify,cb)
    {
        do {
            if (Client.onrecv) Client.onrecv(c, notify);
            var code = c.code || 0;
            if(code !== 0 )
            {
                if(cb && cb.hasOwnProperty('e') &&(cb['e'] == "all" || k2(cb['e'],code)))
                {
                    cb.cb.apply(cb.t,[c,r])
                }
                else
                {
                    Client.onservererror(c.code);
                }

            }else{
                c.ID = i;
                c.payloadName = n;
                c.timestamp = c.timestamp;
                Client.dispatch(c, r);
                if(cb && !cb.hasOwnProperty('e'))
                {
                    cb.cb.apply(cb.t,[c,r])
                }
                delete c.ID;
                delete c.payloadName;
                delete c.timestamp;
            }
        } while ( 0 );
    },
    disconect:function()
    {
        Game.Net.CWebSocket.Instance.disconect();
    },
    beginConnect:function()
    {
        var cw = Game.Net.CWebSocket.Instance;
        cw.beginConnect.apply(cw,arguments);
    }

});