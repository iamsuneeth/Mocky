import React from 'react';

const List = props => (
    <ul className="list">
        {props.items.map((item,index) => (
            <ListItem key={index} item={item} />
        ))}
    </ul>
);


const ListItem = props => (
    <li className={Style.listItem} key={props.key}>
        <div className={card}>
            <div className="header">{props.item.header}</div>
            <div className="body">{props.item.content}</div>
            <div className="footer">{props.item.footer}</div>
        </div>
    </li>
)

export default List;