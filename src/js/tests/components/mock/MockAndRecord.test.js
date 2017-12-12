import React from 'react';
import MockAndRecord from '../../../components/mock/MockAndRecord';
import {renderComponent} from '../../testHelper';

let component = null;
beforeAll(() => {
     let props = {
         saveHAR:() => (
             new Promise((resolve,reject) => (
                 resolve("completed")
             ))
         )
     }
     component = renderComponent(MockAndRecord,props);
});

it('renders 2 children', () => {
    expect(component.children().length).toEqual(2);
});

it('renders 2 buttons', () => {
    expect(component.find('button').length).toEqual(2);
});

it('renders 1 input with id template', () => {
    expect(component.first().find('input#template').exists()).toBe(true);
});

it('send HAR button should increase har send count', () => {
    expect(component.childAt(1).find('button').exists()).toBe(true);
    component.childAt(1).find('button.saveHar').simulate('click');

})
