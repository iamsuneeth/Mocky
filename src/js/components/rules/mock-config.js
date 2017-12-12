import React from 'react';


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
        return (
            <div className="mock-config">
                <p><label htmlFor="mockurl">Mock URL: </label><input id="mockurl" type="text" onChange={this.onMockUrlChange}/></p>
                <p><label htmlFor="sendurl">Send URL: </label><input id="sendurl" type="text" onChange={this.onSendUrlChange}/></p>
                <p>
                    <button className="savemockconfig"onClick={this.saveMockConfig}>Save Config</button>
                </p>
            </div>
        )
    }
    
}

export default MockConfig;