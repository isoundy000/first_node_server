Class({
    ClassName: "App.Server.CMonitorData",
    isWorking:false,
    name:null,
    num:null,
    ctor: function (name,index) {
        this.name = name;
        this.num = index;
        this.isWorking = false;
    }
})