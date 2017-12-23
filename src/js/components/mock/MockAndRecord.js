import React from 'react';
import PropTypes from 'prop-types';
import Style from './mockAndRecord.scss';
import Page from '../common/Page';
import ButtonContainer from '../common/ButtonContainer';
import Button from '../common/Button';
import Row from '../common/Row';
import List from '../common/List';

class MockAndRecord extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            template:'',
            url:'',
            harSendCount:0,
            error:''
        };
        this.onTemplateChange = this.onTemplateChange.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
        this.saveHAR = this.saveHAR.bind(this);
    }

    onTemplateChange (event){
        this.setState({
            template: event.target.value
        })
    }

    onUrlChange (event){
        this.setState({
            url: event.target.value
        })
    }

    saveHAR(){
        this.setState({
            error:'',
            template:'',
            url:''
        });
        console.log(this.props);
        this.props.saveHAR(
            this.state.template,
            this.state.url
        );
    }
    render(){
        let headerPropsMock={
            header:'Mock',
            subheader: 'create mocking configuration templates'
        }
        return (
            <div className={Style.mockRecord}>
                <Page headerProps={headerPropsMock}>
                    <Row noLabel={false} placeholder={'Template Name'} value={this.state.template} onChangeHandler={this.onTemplateChange} />
                    <Row noLabel={false} placeholder={'Url prefix to mock'} value={this.state.url} onChangeHandler={this.onUrlChange} />
                    <ButtonContainer align="flex-start">
                        <Button text="Save HAR" clickHandler={this.saveHAR} />
                    </ButtonContainer>
                </Page>
            </div>
        )
    }
    
}

MockAndRecord.propTypes = {
    saveHAR: PropTypes.func
}


export default MockAndRecord;