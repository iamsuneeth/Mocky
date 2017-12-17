import React from 'react';
import Row from '../common/Row';
import style from './mock-config.scss';
import Page from '../common/Page';
import ButtonContainer from '../common/ButtonContainer';
import Button from '../common/Button';

class MockConfig extends React.Component{
    constructor() {
        super();
        this.state = {
            mockUrl:'',
            sendUrl:''
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
        });
    }

    render(){
        let headerProps = {
            header:'Mock Configuration',
            backgroundColor:'rgb(76, 150, 101)',
            color:"#fff"
        }
        return (
            <div className={style.mockConfig}>
                <Page headerProps={headerProps}>
                <Row noLabel={false} placeholder={'Mock URL'} onChangeHandler={this.onMockUrlChange}/>
                <Row noLabel={false} placeholder={'Send URL'} onChangeHandler={this.onSendUrlChange}/>
                <ButtonContainer align="flex-end">
                    <Button text="Save Config" clickHandler={this.saveMockConfig}/>
                </ButtonContainer>
                </Page>
            </div>
        )
    }
    
}

export default MockConfig;