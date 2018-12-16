
(function (out) {
    require("./Core/Core.js");
    require("./Core/CBaseHelper.js");
    require("./Core/CMapArray.js");

    let Bitch = {};
    global.Bitch = Bitch;
    Bitch.PB = require("./Net/PB/protobuf.js");
    require("./Net/CPBStruct.js");
    require("./Net/CSocket.js");
    require("./Net/Client.js");
    require("./Net/Server.js");

    var protocol = require("./Net/protocol.js");
    Client.init(protocol.Server);
    Server.init(protocol.Client);
})(window)