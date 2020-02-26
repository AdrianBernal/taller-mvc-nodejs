var http = require('http');

var ip = '127.0.0.1';
var port = 8899;

var server = http.createServer(function (req, res){
    if (req.method === 'GET') {
        require('./router').get(req, res);
    } else if (req.method === 'POST') {
        require('./router').post(req, res)
    }
});

server.listen(port, ip);



