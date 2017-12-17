const http = require('http');


http.createServer((req,res)=> {
    res.writeHead(201,{'Content-type':'application/json'});
    res.write(JSON.stringify({
        'status':'created'
    }));
    res.end();
}).listen(9000);