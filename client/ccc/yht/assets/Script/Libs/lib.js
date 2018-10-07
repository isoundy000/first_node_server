(function (out) {
    require("./Core/Core.js");
    require("./Core/CBaseHelper.js");
    require("./Core/CMapArray.js");

    let Bitch = {};
    Bitch.PB = require("./Net/PB/protobuf.js");
    require("./Net/CPBStruct.js");
    require("./Net/CSocket.js");

    out.Bitch = Bitch;
})(window)