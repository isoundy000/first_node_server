require('../../libs/CAppSystem');

App.Pb = App.Pb || {};
App.Pb.Rpc = {}
App.Pb.Rpc.Structs = App.System.protobuf.newBuilder({})['import']({
  "package": "proto",
  "messages": [
    {
      "name": "S2SAuthen",
      "fields": [
        {
          "rule": "required",
          "type": "string",
          "name": "token",
          "id": 1
        }
      ]
    },
    {
      "name": "S2SAuthenResponse",
      "fields": [
        {
          "rule": "required",
          "type": "int32",
          "name": "ret",
          "id": 1
        }
      ]
    }
  ]
}).build().proto;