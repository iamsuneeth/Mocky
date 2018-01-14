const fs = require('fs-extra');
const util = require('util');
const {URL} = require('url');
const fs_writefile = util.promisify(fs.writeFile);
const fs_makedir = util.promisify(fs.mkdir);
const fs_readfile = util.promisify(fs.readFile);
const fs_remove = util.promisify(fs.remove);
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

const readResponse = (requestUrl) => {;
    let url = new URL(requestUrl);
    let id = url.searchParams.get('template');
    let dir = url.port?`${basePath}/${url.hostname}/${url.port}/${id}/${url.pathname}`:`${basePath}/${url.hostname}/${id}/${url.pathname}`;
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

const deleteData = ({template, host}) => {
    let url = new URL(host);
    let dir = url.host?`${basePath}/${url.hostname}/${url.port}/${template}`:`${basePath}/${url.hostname}/${template}`;
    return fs_remove(dir);
}

module.exports = {
    saveContent,
    readResponse,
    deleteData
}