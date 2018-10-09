
Core.$AlwaysDefines('App.Server.Fight.CHandler',{
  token: {
    id: 1,
    struct: App.Pb.Session.Structs.C2SConnectRequest,
    cb: 'tokenResponse'
  },
  tokenResponse: {
    id: 2,
    struct: App.Pb.Session.Structs.C2SConnectRequest
  },
  token2: {
    id: 3
  },
  token2Response: {
    id: 4
  }
})