const url = require('url');
const fs = require('fs');


function get (req, res) {

    // URL parse V1
    // console.log("url: "+
    //
    // var path = req.url.split('?')[0].split('#')[0];
    // console.log("path: "+path);
    //
    // var params = [];
    // try {
    //     var paramsAux = req.url.split('?')[1].split('&');
    //     //paramsAux.forEach(param => params.push({name: param.split('=')[0], value: param.split('=')[1]}));
    //     paramsAux.forEach(param => params[param.split('=')[0]]=param.split('=')[1]);
    // } catch (e) {
    //
    // }
    // console.log("params: "+params);

    // URL parse V2
    //console.log("url: "+req.url);
    req.requrl = url.parse(req.url, true);
    //console.log(req.requrl);
    var path = req.requrl.pathname;

    //Routing
    if (/.(\.css)$/.test(path)) { //If css return style file
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });
        fs.readFile(__dirname + path, 'utf8', (err, data) => {
            if (err) throw err; // ATENCIÓN: Tira el servidor.
            res.write(data, 'utf8');
            res.end();
        });
    } else if (/.(\.js)$/.test(path)) { //If js return file
        res.writeHead(200, {
            'Content-Type': 'application/javascript'
        });
        fs.readFile(__dirname + path, 'utf8', (err, data) => {
            if (err) throw err; // ATENCIÓN: Tira el servidor.
            res.write(data, 'utf8');
            res.end();
        });
    } else { //Else route to controller
        if (path === '/') {
            require('./controllers/userController').get(req, res);
        } else {
            require('./controllers/404').get(req, res);
        }
    }
}

function renderNotFound (req, res) {
    require('./controllers/404').get(req, res);
}


function post (req, res) {
    req.requrl = url.parse(req.url, true);
    var path = req.requrl.pathname;
    if (path === '/user') {
        require('./controllers/userController').save(req, res);
    } else {
        renderNotFound();
    }
}

module.exports.get = get;
module.exports.post = post;
module.exports.renderNotFound = renderNotFound;