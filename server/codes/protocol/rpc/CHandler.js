
Core.$AlwaysDefines('App.Rpc.CHandler',{
  serverStart: {
    id: 0,
    struct: (undefined).Structs.S2SServerStart
  },
  allServerStart: {
    id: 1
  },
  authen: {
    id: 2,
    struct: (undefined).Structs.S2SAuthen,
    cb: 'authenResponse'
  },
  authenResponse: {
    id: 3,
    struct: (undefined).Structs.S2SAuthen
  },
  fightToken: {
    id: 100,
    struct: (undefined).Structs.S2SAuthen,
    cb: 'fightTokenResponse'
  },
  fightTokenResponse: {
    id: 101
  },
  sessionToken: {
    id: 201,
    struct: (undefined).Structs.S2SAuthen,
    cb: 'sessionTokenesponse'
  },
  sessionTokenesponse: {
    id: 202
  }
})