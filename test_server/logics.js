const fs = require('fs-extra');
const util = require('util');
const fs_writefile = util.promisify(fs.writeFile);
const fs_makedir = util.promisify(fs.mkdir);
const fs_readfile = util.promisify(fs.readFile);
const {basePath} = require('./constants');

const parseHAR = (har, host, url) => {
    return new Promise((resolve,reject) => {
        let filtered = har.filter(elem => {
            if(elem.request.url.indexOf(`${host}/${url}/`) !== -1){
                return true;
            }
        });
        if(filtered.length===0){
            reject(filtered);
        }
        filtered = filtered.map(elem => {
            let parsedHost = host.replace(/(http:\/\/|https:\/\/)/,'');
            let key = elem.request.url.replace(new RegExp(`(http:\/\/|https:\/\/)?${host}\/`),'').replace(/\?(.*)/,'');
            return {
                key,
                host:parsedHost,
                data:{
                    status:elem.response.status,
                    content:elem.response.content.text
                }
            }
        });
        resolve(filtered);
    })
    
}

const saveHAR = (id,data) => {
    return Promise.all(
        data.map((elem) => {
            return new Promise((resolve, reject) => {
                let dir = `${basePath}/${elem.host}/${id}/${elem.key}`
                fs.mkdirp(dir)
                    .then(() => {
                        return fs_writefile(`${dir}/response.json`,JSON.stringify(elem.data))
                    })
                    .then(() => {
                        resolve(true);
                    })
                    .catch(error => {
                        console.log(error);
                        if(error.code === 'EEXIST')
                            resolve(false);
                        else
                            reject(error);
                    })
                   
                })
            })
        )
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
            console.log(url);
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
    parseHAR,
    saveHAR,
    readResponse
}