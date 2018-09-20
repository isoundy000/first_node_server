var net = require('net');

const HOST = '127.0.0.1';
const PORT = 3001;

var tcpClient = net.Socket();

tcpClient.connect(PORT, HOST, function(){
    console.log('connect success.');
    setInterval(function(){
        tcpClient.write('this is tcp client by Node.js');//服务器向客户端发送消息
    },1000)
});

//监听服务器端发过来的数据
tcpClient.on('data', function(data){
    console.log('received: ', data.toString());
});