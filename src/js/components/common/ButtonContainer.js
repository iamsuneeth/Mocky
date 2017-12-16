import React from 'react';
import Style from './button-container.scss';

export default props => (
    <div className={Style.container} style={{justifyContent:props.align}}>
        {React.Children.map(props.children,(Button,counter) =>(
            <div key={counter} className={Style.button}>
                {Button}
            </div>
        ))}
    </div>
);