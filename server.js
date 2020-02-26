var http = require('http');

var http_IP = '127.0.0.1';
var http_port = 8899;

//V2
var methods = {
    GET: 'get',
    POST: 'post'
};

var server =
    http.createServer(
        (req, res) => {
            //Routing V1
            // if (req.method === 'GET') {
            //     require('./router').get(req, res);
            // } else if (req.method === 'POST') {
            //     require('./router').post(req, res)
            // }

            //Routing V2
            try {
                require('./router')[methods[req.method]](req, res);
            } catch (e) {
                require('./router').renderNotFound(req, res);
            }
        }
    );

server.listen(http_port, http_IP);

console.log('listening to http://' + http_IP + ':' + http_port);