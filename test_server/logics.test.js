const {saveContent, readResponse, deleteData} = require('./logics');
const fs = require('fs-extra');

it('saves content', () => {

    return saveContent("template2",{
        "text":"asdsdasdasdasdasdsaasdasdsdsdsdasd"
    },'https://javascript.info/async/something?sd=22',{"status":200}).then((data) => {
        console.log(data);
        expect(data).toEqual(true);
    });
});

it('reads response',() => {
    return readResponse('https://javascript.info/async/something?template=template2')
            .then((data) => {
                expect(typeof data).toBe('object');
                expect(data).toHaveProperty('status');
                expect(data).toHaveProperty('content');
                console.log(data);
            })
})

it('deletes directory',() => {
    let request = {template:'localhost2', host:'slenin-in.in.oracle.com:7777'}
    return deleteData(request).then(() => {
        expect().toBe(undefined);
    })
})