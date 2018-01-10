import React from 'react';
import Page from '../common/Page';
import List from '../common/List';
import style from './template-list.scss';

let headerPropsList={
    header:'Template List',
    subheader:'List of templats for mocking'
}

const TemplateList = props => {

    let items = props.templates.map((item)=> {
        item.label = 'URL';
        item.content = item.url;
        return item;
    })
    return (
    <div className={style.templates}>
        <Page headerProps={headerPropsList}>
            <List items={items} mockHandler={props.startMock} status={props.status} template={props.template} delete={props.delete}/>
        </Page>
    </div>
    )
}

export default TemplateList;