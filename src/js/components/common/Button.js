import React from 'react';
import Style from './button.scss';
import PropTypes from 'prop-types';

const Button = props => (
    <button className='button' onClick={props.clickHandler}>{props.text}</button>
);

Button.propTypes = {
    text:PropTypes.string,
    clickHandler:PropTypes.func
}

export default Button;