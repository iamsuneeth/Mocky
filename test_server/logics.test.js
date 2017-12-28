const {saveContent, readResponse} = require('./logics');
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
    return readResponse('javascript.info','/?url=async/something&template=template2')
            .then((data) => {
                expect(typeof data).toBe('object');
                expect(data).toHaveProperty('status');
                expect(data).toHaveProperty('content');
                console.log(data);
            })
})

afterAll(() => {
    fs.remove('javascript.info',(err) => console.log(err));
});