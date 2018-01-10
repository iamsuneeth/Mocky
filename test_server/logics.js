const fs = require('fs-extra');
const util = require('util');
const {URL} = require('url');
const fs_writefile = util.promisify(fs.writeFile);
const fs_makedir = util.promisify(fs.mkdir);
const fs_readfile = util.promisify(fs.readFile);
const fs_emptyDir = util.promisify(fs.emptyDir);
const {basePath} = require('./constants');

const saveContent = (id,content,url,response) => {
    url = new URL(url);
    const host = url.hostname;
    const port = url.port;
    const path = url.pathname;
    return new Promise((resolve, reject) => {
        let dir = port?`${basePath}/${host}/${port}/${id}/${path}`:`${basePath}/${host}/${id}/${path}`
        fs.mkdirp(dir)
            .then(() => {
                return fs_writefile(`${dir}/response.json`,JSON.stringify(createJson(content,response)));
            })
            .then(() => {
                resolve(true);
            })
            .catch(error => {
                if(error.code === 'EEXIST')
                    resolve(false);
                else
                    reject(error);
            })
           
    });
            
}

function createJson(content,response){
    return {
        status:response.status,
        content
    }
}

const readResponse = (requestUrl) => {
    let {url,id,host} = tokenize(requestUrl);
    url = new URL(url);
    let dir = url.port?`${basePath}/${url.hostname}/${url.port}/${id}/${url.pathname}`:`${basePath}/${url.host}/${id}/${url.pathname}`;
    return new Promise((resolve, reject) => {
        fs_readfile(`${dir}/response.json`,(err, data) => {
            if(err){
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    })
}

const deletData = ({template, host, port}) => {
    let url = new URL(host);
    let dir = url.host?`${basePath}/${url.hostname}/${url.port}/${template}`:`${basePath}/${url.hostname}/${template}`;
    return fs.emptyDir(dir);
}

function tokenize(data){
    data = data.replace('/\?','');
    let args = data.split('&');
    let url,id,host;
    args.map(elem => {
        let tokens = elem.split('=')
        if(tokens[0]==='url'){
            url = tokens[1].replace(/\?(.*)/,'');
        }else if(tokens[0]==='template'){
            id = tokens[1];
        }else if(tokens[0]==='host'){
            host = tokens[1];
        }
    });
    return {
        url,
        id,
        host
    }
}

module.exports = {
    saveContent,
    readResponse
}