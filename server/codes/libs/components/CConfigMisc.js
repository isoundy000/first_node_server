Class({
    ClassName: "App.Lib.CConfigMisc",
    config:null,
    init: function () {
        this.config = require("../../../config/config");
    },
    clear:function() {

    }
}).Static({
    Instance: Core.Instance
})