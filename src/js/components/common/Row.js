import React from 'react';
import style from './row.scss';

export default props => {

    return (
        <div className={style.row}>
            { props.noLabel?'':<div className={style.rowLabel}><label htmlFor="rowValue">{props.label}</label></div>}
            <div className={style.rowValue}><input disabled={props.disabled} id="rowValue" type="text" value={props.value} placeholder={props.placeholder} onChange={props.onChangeHandler}/></div>
        </div>
    )
}