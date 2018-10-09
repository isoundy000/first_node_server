
Core.$AlwaysDefines('App.Server.Session.CHandler',{
  token: {
    id: 101,
    struct: App.Pb.Session.Structs.C2SConnectRequest,
    cb: 'tokenResponse'
  },
  tokenResponse: {
    id: 102,
    struct: App.Pb.Session.Structs.C2SConnectRequest
  },
  token2: {
    id: 103
  },
  token2Response: {
    id: 104
  }
})