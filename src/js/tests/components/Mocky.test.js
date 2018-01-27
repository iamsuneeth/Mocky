import React from 'react';
import App from '../../components/Mocky';
import MockAndRecord from '../../components/mock/MockAndRecord';
import MockConfig from '../../components/rules/mock-config';
import {renderComponent} from '../testHelper';
import Style from '../../components/mocky.scss';
import chrome from 'sinon-chrome';

let component = null;
beforeAll(() => {
    global.chrome = chrome;
     component = renderComponent(App);
});

it('renders 2 children', () => {
    console.log(component.__proto__);
    expect(component.find('.mockyApp').children().length).toBe(2);
});

// it('renders MockAndRecord', () => {
//     expect(component.find('.mocky-app').find(MockAndRecord).exists()).toBe(true);
// });

// it('renders MockConfig', () => {
//     expect(component.find('.mocky-app').find(MockConfig).exists()).toBe(true);
// });