/**
 * Created by Administrator on 2018/9/13.
 */
Class({
    ClassName: "App.Lib.Channel.CChannelData",
    sessions:null,
    name:null,
    alwaysExist:false,
    ctor: function (name,alwaysExist) {
        this.name = name;
        this.alwaysExist = alwaysExist;
        this.sessions = new Core.CMapArray("id",[{id:true}]);
    },
    clear: function () {

    }
})