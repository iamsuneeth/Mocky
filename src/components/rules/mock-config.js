import React from 'react';


class MockConfig extends React.Component{
    constructor() {
        super();
        this.state = {
            host:'',
            port:'',
            mockUrl:'',
            sendUrl:''
        };
        this.onHostChange = this.onHostChange.bind(this);
        this.onPortChange = this.onPortChange.bind(this);
        this.onMockUrlChange = this.onMockUrlChange.bind(this);
        this.onSendUrlChange = this.onSendUrlChange.bind(this);
        this.saveMockConfig = this.saveMockConfig.bind(this);
    }

    onHostChange(event){
        this.setState({
            host: event.target.value
        })
    }
    onPortChange(event){
        this.setState({
            port: event.target.value
        })
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
        this.saveMockConfig(
            this.state.host,
            this.state.port,
            this.state.mockUrl,
            this.state.sendUrl
        );
    }

    render(){
        return (
            <div className="mock-config">
                <p><label htmlFor="host">Host: </label><input id="host" type="text" onChange={this.onHostChange}/></p>
                <p><label htmlFor="port">Port: </label><input id="port" type="text" onChange={this.onPortChange}/></p>
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