const fs = require('fs-extra');
const util = require('util');
const {URL} = require('url');
const fs_writefile = util.promisify(fs.writeFile);
const fs_makedir = util.promisify(fs.mkdir);
const fs_readfile = util.promisify(fs.readFile);
const {basePath} = require('./constants');

const saveContent = (id,content,url,response) => {
    url = new URL(url);
    const host = url.hostname;
    const path = url.pathname;
    return new Promise((resolve, reject) => {
        let dir = `${basePath}/${host}/${id}/${path}`
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

const readResponse = (host,requestUrl) => {
    let parsedHost = host.replace(/(http:\/\/|https:\/\/)/,'');
    let {url,id} = tokenize(requestUrl);
    return new Promise((resolve, reject) => {
        fs_readfile(`${basePath}/${parsedHost}/${id}/${url}/response.json`,(err, data) => {
            if(err){
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    })
}

function tokenize(data){
    data = data.replace('/\?','');
    let args = data.split('&');
    let url,id;
    args.map(elem => {
        let tokens = elem.split('=')
        if(tokens[0]==='url'){
            url = tokens[1].replace(/\?(.*)/,'');
        }else if(tokens[0]==='template'){
            id = tokens[1];
        }
    });
    return {
        url,
        id
    }
}

module.exports = {
    saveContent,
    readResponse
}