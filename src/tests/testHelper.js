import React from 'react';
import Enzyme from 'enzyme';
import { shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

export function renderComponent(Component){
    return shallow(<Component />);
}
