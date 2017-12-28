import React from 'react';
import Row from '../common/Row';
import style from './mock-config.scss';
import Page from '../common/Page';
import ButtonContainer from '../common/ButtonContainer';
import Button from '../common/Button';

class MockConfig extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mockUrl:this.props.mockUrl?this.props.mockUrl:'',
            sendUrl:this.props.sendUrl?this.props.sendUrl:'',
            edit:this.props.mockUrl?false:true
        };
        this.onMockUrlChange = this.onMockUrlChange.bind(this);
        this.onSendUrlChange = this.onSendUrlChange.bind(this);
        this.saveMockConfig = this.saveMockConfig.bind(this);
    }

    onMockUrlChange(event){
        this.setState({
            mockUrl: event.target.value
        })
    }
    onSendUrlChange(event){
        this.setState({
            sendUrl: event.target.value
        })
    }

    saveMockConfig() {
        this.props.saveMockConfig({
            mockUrl:this.state.mockUrl,
            sendUrl:this.state.sendUrl
        }).then(function(){
            this.setState({
                edit:false
            });
        }.bind(this))
        .catch(function(){
            console.log('error');
        })
    }

    render(){
        let headerProps = {
            header:'Mock Configuration',
            subheader:'Configure base configurations'
        }
        return (
            <div className={style.mockConfig}>
                <Page headerProps={headerProps}>
                <Row noLabel={false} placeholder={'Mock URL'} value={this.state.mockUrl} disabled={!this.state.edit} onChangeHandler={this.onMockUrlChange}/>
                <Row noLabel={false} placeholder={'Send URL'} value={this.state.sendUrl} disabled={!this.state.edit} onChangeHandler={this.onSendUrlChange}/>
                <ButtonContainer align="flex-start">
                    {this.state.edit?<Button text="Save Config" clickHandler={this.saveMockConfig}/>:<Button text="Edit Config" clickHandler={() => this.setState({edit:true})}/>}
                </ButtonContainer>
                </Page>
            </div>
        )
    }
    
}

export default MockConfig;