const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const {saveContent, readResponse} = require('./logics');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

const requestHandler = (req,res) => {
    console.log(req.body);
    const {id,url,content,response} = req.body;
    saveContent(id,content,url,response)
    .then((data) => res.send('saved'))
    .catch(error => res.send(error));
}

const mockHandler = (req, res) => {
    console.log(req.url);
    readResponse(req.url)
    .then(data => {
        console.log(data);
        res.status(data.status).send(data.content);
    }).catch(err => res.send(err));
    
}

app.post('/',requestHandler);
app.get('/',mockHandler);




console.log('listening on 9000');
app.listen(9000);