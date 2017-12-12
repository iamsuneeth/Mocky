import React from 'react';
import App from '../../components/Mocky';
import MockAndRecord from '../../components/mock/MockAndRecord';
import MockConfig from '../../components/rules/mock-config';
import {renderComponent} from '../testHelper';

let component = null;
beforeAll(() => {
     component = renderComponent(App);
});

it('renders 2 children', () => {
    expect(component.find('.mocky-app').children().length).toBe(2);
});

it('renders MockAndRecord', () => {
    expect(component.find('.mocky-app').find(MockAndRecord).exists()).toBe(true);
});

it('renders MockConfig', () => {
    expect(component.find('.mocky-app').find(MockConfig).exists()).toBe(true);
});