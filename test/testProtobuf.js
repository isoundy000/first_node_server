require("../codes/protocol/CPbSessionStruct");
var buffer,data,rdata;

data = new App.Pb.Session.Structs.C2SConnectRequest({
    "token":"1",
    "token2":"2",
    "token3":"3",
    "token4":["4","5"]
})
buffer = data.encode();
//console.log(buffer);
rdata = App.Pb.Session.Structs.C2SConnectRequest.decode(buffer);
console.log(rdata);
console.log("-----------------------------------------")
//-----------------------------------------------------------
//-----------------------------------------------------------

data = new App.Pb.Session.Structs.S2CConnectResponse({
    result:true
})
buffer = data.encode();
rdata = App.Pb.Session.Structs.S2CConnectResponse.decode(buffer);
console.log(rdata);
console.log("-----------------------------------------")

//-----------------------------------------------------------
//-----------------------------------------------------------

data = new App.Pb.Session.Structs.S2CConnectContact({
    result:{
        result:false
    }
})
buffer = data.encode();
console.log(buffer)
rdata = App.Pb.Session.Structs.S2CConnectContact.decode(buffer);
console.log(rdata);
console.log("-----------------------------------------")