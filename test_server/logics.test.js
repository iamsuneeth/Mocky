const {parseHAR, saveHAR} = require('./logics');
const fs = require('fs-extra');
let entries = [ {
    "startedDateTime": "2017-12-26T17:14:34.784Z",
    "time": 716.9939999991329,
    "request": {
      "method": "GET",
      "url": "https://javascript.info/async/something?sd=22",
      "httpVersion": "http/2.0",
      "headers": []},
    "response": {
        "status":200,
        "content":{
            "text":"asdsdasdasdasdasdsaasdasdsdsdsdasd"
        }
    }}];


it('parses HAR', () => {
    return parseHAR(entries,'https://javascript.info','async')
        .then((result) => {
            expect(result.length > 0).toBeTruthy();
            expect(result[0]).toHaveProperty('key','async/something');
        });
});

it('create directory', () => {

    return saveHAR("id",[{
        key:'async/something',
        host:"javascript.info",
        data:{
            status:200,
            content:{"ssss":"wwww"}
        }
    },]).then((data) => {
        console.log(data);
        expect(data).toEqual([true]);
        fs.remove('javascript.info',(err) => console.log(err));
    });
});
