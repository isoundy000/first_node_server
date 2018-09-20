/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Rpc.CRpcSystem",
    Base:"App.Lib.CBaseSystem",
    servers:null,
    init: function () {
        this.servers = {};
    },
    clear: function () {
        this.servers = {};
    },
}).Static({
    Instance: Core.Instance
})