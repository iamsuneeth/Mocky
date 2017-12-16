import React from 'react';
import style from './row.scss';

export default props => (
    <div className={style.row}>
        { props.noLabel?'':<div className={style.rowLabel}><label htmlFor="rowValue">{props.label}</label></div>}
        <div className={style.rowValue}><input id="rowValue" type="text" placeholder={props.placeholder} onChange={props.onChangeHandler}/></div>
    </div>
)