import React from 'react';
import Style from './modal.scss';

const Modal = props => (
    <div className={Style.container} style={{display:props.show?'block':'none'}}>
        <div className={Style.modal}>
            <div className={Style.header}>
                <h2>{props.header}</h2>
            </div>
            <div className={Style.body}>
                {props.children}
            </div>
            <div className={Style.footer}>{props.footer}</div>
        </div>
    </div>
)

export default Modal;