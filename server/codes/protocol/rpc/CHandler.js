
Core.$AlwaysDefines('App.Rpc.CHandler',{
  serverStart: {
    id: 0,
    struct: App.Pb.Rpc.Structs.S2SServerStart
  },
  allServerStart: {
    id: 1
  },
  authen: {
    id: 2,
    struct: App.Pb.Rpc.Structs.S2SAuthen,
    cb: 'authenResponse'
  },
  authenResponse: {
    id: 3,
    struct: App.Pb.Rpc.Structs.S2SAuthen
  },
  fightToken: {
    id: 100,
    struct: App.Pb.Rpc.Structs.S2SAuthen,
    cb: 'fightTokenResponse'
  },
  fightTokenResponse: {
    id: 101
  },
  sessionToken: {
    id: 201,
    struct: App.Pb.Rpc.Structs.S2SAuthen,
    cb: 'sessionTokenesponse'
  },
  sessionTokenesponse: {
    id: 202
  }
})