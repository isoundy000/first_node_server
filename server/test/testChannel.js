var net = require('net');
require('../codes/servers/session/CServer');

const HOST = '127.0.0.1';
const PORT = 3001;

var tcpClient = net.Socket();
tcpClient.setEncoding('binary');
tcpClient.connect(PORT, HOST, function(){
    console.log('connect success.');

    var data = App.Lib.Protocol.CFrontProtoSystem.Instance.encode(App.Server.Session.CHandler.token,{
        "token":"123"
    });
    console.warn("send data is:{0}",data)
    setInterval(function(){
        tcpClient.write(data);//
    },3*1000)
});

//�����������˷�����������
tcpClient.on('data', function(data){
    var id = data[0]<<8 | data[1];
    var sessionName = App.Server.Session.CHandler.CFG[id];
    var info =App.Server.Session.CHandler[sessionName];
    var  mBuff = data.slice(2,data.length);
    var msg = info.struct.decode(mBuff);

    console.log( "----------------");
    console.log( data);
    console.log(mBuff);
    console.warn(JSON.stringify(msg))
    console.log( "************");
});