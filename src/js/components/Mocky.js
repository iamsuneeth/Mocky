import React from 'react';
import MockAndRecord from './mock/MockAndRecord';
import MockConfig from './rules/mock-config';

const constants={
    configPresent:false,
    host:'',
    port:'',
    mockUrl:'',
    sendUrl:''
};

class Mocky extends React.Component {

    constructor(){
        super();
        this.state = {
            configPresent:false,
            host:'',
            port:'',
            mockUrl:'',
            sendUrl:'',
            error:''
        }
        this.updateConfig = this.updateConfig.bind(this);
    }


    
    sendHAR(templateId){
        // return new Promise((resolve, reject) => {
        //     chrome.devtools.network.getHAR(function(result) {
        //         let filtredData = filterData(result);
        //         console.log(filtredData);
        //         if (!filtredData.length) {
        //           reject("nothing");
        //         }else{
        //             let payload = {
        //                 id:templateId,
        //                 host:constants.url,
        //                 har:JSON.stringify(filtredData)
        //             }
        //             fetch(this.state.sendUrl, {
        //                 method: 'post',
        //                 body: payload
        //               }).then(function(response) {
        //                 resolve(response.json());
        //               });
        //         }
              
        //       }.bind(this));
        // });
        
    }

    saveRule(event){
        console.log(event);
        event.preventDefault();
        let host = document.getElementById('host').value;
        let url = document.getElementById('url').value;
        let ruleId = document.getElementById('ruleId').value;
        event.target.reset();
        // chrome.runtime.sendMessage({
        //     command: "saveRule",
        //     tabId: chrome.devtools.tabId,
        //     args:{
        //         host,
        //         url,
        //         ruleId
        //     }
        // },function(res){
        //     console.log(res);
        // })
    }

    componentDidMount() {
        // chrome.runtime.sendMessage({
        //     command: "loadBaseConfig",
        //     tabId: chrome.devtools.inspectedWindow.tabId,
        //     args: {
        //     }
        // }, function (res) {
        //     if(res instanceof Object){
        //         this.setState({
        //             configPresent : true,
        //             host : res.host,
        //             port : res.port,
        //             sendUrl : res.sendUrl,
        //             mockUrl : res.mockUrl
        //         })
                
        //     }else{
        //         console.log(res);
        //         this.setState({
        //             host:res
        //         });
        //     }
        // }.bind(this)
        // );
    }

    updateConfig(config){
        config['host'] = this.state.host;
        // chrome.runtime.sendMessage({
        //     command: "updateConfig",
        //     tabId:chrome.devtools.tabId,
        //     args:{
        //         config
        //     }
        // },function(res){
        //     if(res){
        //         console.log("saved");
        //         this.setState({
        //             configPresent:true,
        //             mockUrl:config.mockUrl,
        //             sendUrl:config.sendUrl
        //         })
        //     }else{
        //         this.setState({
        //             error:""
        //         });
        //     }
        // }.bind(this));
    }




    render(){
        console.log(this.state);
        if(this.state.host){
            return (
                <div className="mocky-app">
                    { this.state.configPresent && <MockAndRecord saveHAR={this.sendHAR}/>}
                    { !this.state.configPresent && <MockConfig saveMockConfig={this.updateConfig}/>}
                </div>
            )
        }else{
            return (
                <div className="mocky-app">
                    not a proper url to mock
                </div>
            )
        }
    }

}


function filterData(data){
    let filtered = data.entries.filter(element => {
        let contentType = element.response.headers.filter(element => {
            return element.name === 'content-type';
        });
        return contentType.value === 'application/json';
    });
    console.log(filtered);
    return filtered;
}

export default Mocky;