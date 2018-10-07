require('../../libs/CAppSystem');

App.Pb = App.Pb || {};
App.Pb.Session = {}
App.Pb.Session.Structs = App.System.protobuf.newBuilder({})['import']({
  "package": "proto",
  "messages": [
    {
      "name": "C2SConnectRequest",
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
      "name": "S2CConnectResponse",
      "fields": [
        {
          "rule": "required",
          "type": "bool",
          "name": "result",
          "id": 1
        }
      ]
    },
    {
      "name": "S2CConnectContact",
      "fields": [
        {
          "rule": "required",
          "type": "S2CConnectResponse",
          "name": "result",
          "id": 1
        }
      ]
    }
  ]
}).build().proto;