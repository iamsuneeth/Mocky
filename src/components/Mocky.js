import React from 'react';
import MockAndRecord from './mock/MockAndRecord';
import MockConfig from './rules/mock-config';

const constants={
    url:''
};

class Mocky extends React.Component {
    
    sendHAR(templateId){
        return new Promise((resolve, reject) => {
            // chrome.devtools.network.getHAR(function(result) {
            //     let filtredData = filterData(result);
            //     console.log(filtredData);
            //     if (!filtredData.length) {
            //       reject("nothing");
            //     }else{
            //         let payload = {
            //             id:templateId,
            //             host:constants.url,
            //             har:JSON.stringify(filtredData)
            //         }
            //         fetch('https://mum00bja:8080/', {
            //             method: 'post',
            //             body: payload
            //           }).then(function(response) {
            //             resolve(response.json());
            //           });
            //     }
              
            //   });
        })
        
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
        //     command: "getURL",
        //     tabId: chrome.devtools.tabId,
        //     args: {
        //     }
        // }, function (res) {
        //     constants.url = res;
        // }
        // )
    }




    render(){
        return (
            <div className="mocky-app">
                <MockAndRecord saveHAR={this.sendHAR}/>
                <MockConfig />
            </div>
        )
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