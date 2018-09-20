var net = require('net');

const HOST = '127.0.0.1';
const PORT = 3001;

var tcpClient = net.Socket();

tcpClient.connect(PORT, HOST, function(){
    console.log('connect success.');
    setInterval(function(){
        tcpClient.write('this is tcp client by Node.js');//��������ͻ��˷�����Ϣ
    },1000)
});

//�����������˷�����������
tcpClient.on('data', function(data){
    console.log('received: ', data.toString());
});