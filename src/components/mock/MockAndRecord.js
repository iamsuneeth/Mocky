import React from 'react';


class MockAndRecord extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            template:'',
            harSendCount:0,
            error:''
        };
        this.onTemplateChange = this.onTemplateChange.bind(this);
        this.saveHAR = this.saveHAR.bind(this);
    }

    onTemplateChange (event){
        this.setState({
            template: event.target.value
        })
    }

    saveHAR(){
        this.setState({
            error:''
        });
        console.log(this.props);
        this.props.saveHAR(
            //this.state.template
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
        return (
            <div className="mock-record">
                <p><label htmlFor="template">Template: </label><input id="template" type="text" onChange={this.onTemplateChange}/></p>
                <p>
                    <button className="saveHar"onClick={this.saveHAR}>Save HAR</button>
                    <button className="startMocking" onClick={this.props.startMock}>Start Mocking</button>
                    <span>{this.state.error}</span>
                </p>
            </div>
        )
    }
    
}

export default MockAndRecord;