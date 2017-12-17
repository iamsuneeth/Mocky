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
            error:'',
            templates:[],
            templatesLoaded:false
        };
        this.onTemplateChange = this.onTemplateChange.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
        this.saveHAR = this.saveHAR.bind(this);
    }

    componentDidMount(){
        this.props.fetchTemplateList().then((res) => {
            this.setState({
                templates:res,
                templatesLoaded:true
            });
        })
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
            error:''
        });
        console.log(this.props);
        this.props.saveHAR(
            this.state.template,
            this.state.url
        ).then(function(res){
            this.setState({
                harSendCount:++this.state.harSendCount
            });
        }.bind(this)
        ).catch(function(res){
            this.setState({error:res});
        }.bind(this))
    }
    render(){
        let headerPropsMock={
            header:'Mock',
            backgroundColor:'rgb(46, 120, 206)',
            color:"#fff"
        }
        let headerPropsList={
            header:'Template List',
            backgroundColor:'rgb(76, 150, 101)',
            color:'#fff'
        }
        return (
            <div className={Style.mockRecord}>
                <div className={Style.mockParent}>
                    <div className={Style.mockChild}>
                        <Page headerProps={headerPropsList}>
                        { this.state.templatesLoaded && <List items={this.state.templates} mockHandler={this.props.startMock}/>}
                        </Page>
                    </div>
                    <div className={Style.mockChild}>
                        <Page headerProps={headerPropsMock}>
                            <Row noLabel={false} placeholder={'Template Name'} onChangeHandler={this.onTemplateChange}/>
                            <Row noLabel={false} placeholder={'Url prefix to mock'} onChangeHandler={this.onSendUrlChange}/>
                            <ButtonContainer align="center">
                                <Button text="Save HAR" clickHandler={this.saveHAR}/>
                            </ButtonContainer>
                        </Page>
                    </div>
                </div>
            </div>
        )
    }
    
}

MockAndRecord.propTypes = {
    saveHAR: PropTypes.func
}


export default MockAndRecord;