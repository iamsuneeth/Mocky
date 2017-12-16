import React from 'react';
import Style from './page.scss';

export default props => (
    <div className={Style.page}>
        <Header {...props.headerProps}/>
        <Body>
            {props.children}
        </Body>
    </div>
)


const Header = props => (
    <div className={Style.pageHeader} style={{backgroundColor:props.backgroundColor,color:props.color}}>
        <h3>{props.header}</h3>
    </div>
)

const Body = props => (
    <div className={Style.pageBody}>
        {props.children}
    </div>
)
