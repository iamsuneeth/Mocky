import React from 'react';
import style from './sidebar.scss';

class SideBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected:props.selected
        }
        this.click = this.click.bind(this);
    }

    click(id){
        this.setState({
            selected:id
        });
        this.props.clickHandler(id);
    }

    render(){
        return (
            <div className={style.sideBar}>
                <ul>
                    <li><a className={this.state.selected==='config'?style.selected:''} onClick={() => this.click('config')}><span>Base Config</span></a></li>
                    <li><a className={this.state.selected==='mock'?style.selected:''} onClick={() => this.click('mock')}><span>Mock</span></a></li>
                    <li><a className={this.state.selected==='template'?style.selected:''} onClick={() => this.click('template')}><span>Template</span></a></li>
                </ul>
            </div>
        )
    }
}



export default SideBar;