require('../libs/CAppSystem');

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
        },
        {
          "rule": "required",
          "type": "string",
          "name": "token2",
          "id": 2
        },
        {
          "rule": "repeated",
          "type": "string",
          "name": "token4",
          "id": 3
        },
        {
          "rule": "optional",
          "type": "string",
          "name": "token3",
          "id": 4
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