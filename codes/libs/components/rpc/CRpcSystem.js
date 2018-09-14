/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Rpc.CRpcSystem",
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