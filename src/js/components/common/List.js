import React from 'react';
import Style from './List.scss';
import ButtonContainer from '../common/ButtonContainer';
import Button from '../common/Button';


const List = props => {
    if(props.items.length > 0)
        return (
            <ul className={Style.list}>
                {props.items.length>0 && props.items.map((item,index) => (
                    <ListItem key={index} item={item} mockHandler={props.mockHandler}/>
                ))}
            </ul>
            );
    else
        return (
            <div><span>Nothing to show</span></div>
        )
};


const ListItem = props => (
    <li className={Style.listItem}>
        <div className={Style.card}>
            <div className={Style.header}><h3>{props.item.templateId}</h3></div>
            <div className={Style.body}><span className={Style.label}>{props.item.label+' : '}</span><span className={Style.content}>{props.item.content}</span></div>
            <div className={Style.footer}>{props.item.footer}</div>
            <ButtonContainer align="flex-start">
                <Button text="Start Mocking" clickHandler={()=>props.mockHandler(props.item.templateId)}/>
            </ButtonContainer>
        </div>
    </li>
)

export default List;