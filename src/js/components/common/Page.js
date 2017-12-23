import React from 'react';
import Style from './page.scss';

export default props => (
    <div className={Style.page}>
        <Header {...props.headerProps}/>
        <hr/>
        <Body>
            {props.children}
        </Body>
    </div>
)


const Header = props => (
    <div className={Style.pageHeader}>
        <h3>{props.header}</h3>
        <h4>{props.subheader}</h4>
    </div>
)

const Body = props => (
    <div className={Style.pageBody}>
        {props.children}
    </div>
)
