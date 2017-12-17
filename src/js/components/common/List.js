import React from 'react';
import Style from './List.scss';
import ButtonContainer from '../common/ButtonContainer';
import Button from '../common/Button';


const List = props => {
    console.log(props.items);
    return (
    <ul className={Style.list}>
        {props.items.length>0 && props.items.map((item,index) => (
            <ListItem key={index} item={item} mockHandler={props.mockHandler}/>
        ))}
    </ul>
    )
};


const ListItem = props => (
    <li className={Style.listItem}>
        <div className={Style.card}>
            <div className={Style.header}><h3>{props.item.templateId}</h3></div>
            <div className={Style.body}><span className={Style.label}>{props.item.label}</span><span className={Style.content}>{props.item.content}</span></div>
            <div className={Style.footer}>{props.item.footer}</div>
            <hr/>
            <ButtonContainer align="center">
                <Button text="Start Mocking" clickHandler={()=>props.mockHandler(props.item.templateId)}/>
            </ButtonContainer>
        </div>
    </li>
)

export default List;