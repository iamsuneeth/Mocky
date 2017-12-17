import React from 'react';
import MockAndRecord from './mock/MockAndRecord';
import MockConfig from './rules/mock-config';
import style from './mocky.scss';
import Modal from './common/Modal';
import Button from './common/Button';

class Mocky extends React.Component {
  constructor() {
    super();
    this.state = {
      configPresent: false,
      host: '',
      port: '',
      mockUrl: '',
      sendUrl: '',
      error: '',
      active:false
    };
    this.updateConfig = this.updateConfig.bind(this);
  }

  componentDidMount() {
    chrome.runtime.sendMessage({
      command: 'loadBaseConfig',
      tabId: chrome.devtools.inspectedWindow.tabId,
      args: {
      },
    }, (res) => {
      if (res instanceof Object) {
        this.setState({
          configPresent: true,
          host: res.host,
          port: res.port,
          sendUrl: res.sendUrl,
          mockUrl: res.mockUrl,
        });
      } else{
        console.log(res);
        this.setState({
          host: res,
        });
      }
    } );
  }

  sendHAR(templateId) {
    return new Promise((resolve, reject) => {
      chrome.devtools.network.getHAR((error, result) => {
        const filtredData = filterData(result);
        console.log(filtredData);
        if (!filtredData.length) {
          reject(error);
        } else {
          const payload = {
            id: templateId,
            host: constants.url,
            har: JSON.stringify(filtredData),
          };
          fetch(this.state.sendUrl, {
            method: 'post',
            body: payload,
          }).then((response) => {
            resolve(response.json());
          });
        }
      });
    });
  }

  saveRule(event) {
    console.log(event);
    event.preventDefault();
    const host = document.getElementById('host').value;
    const url = document.getElementById('url').value;
    const ruleId = document.getElementById('ruleId').value;
    event.target.reset();
    chrome.runtime.sendMessage({
      command: 'saveRule',
      tabId: chrome.devtools.inspectedWindow.tabId,
      args: {
        host,
        url,
        ruleId,
      },
    }, (res) => {
      console.log(res);
    });
  }

  updateConfig(config) {
    config.host = this.state.host;
    this.setState({
      configPresent:true,
      mockUrl:config.mockUrl,
      sendUrl:config.sendUrl
    });
    chrome.runtime.sendMessage({
      command: 'updateConfig',
      tabId: chrome.devtools.inspectedWindow.tabId,
      args: {
        config,
      },
    }, (res) => {
      if (res) {
        console.log('saved');
        this.setState({
          configPresent: true,
          mockUrl: config.mockUrl,
          sendUrl: config.sendUrl,
        });
      }else {
        this.setState({
          error: '',
        });
      }
    });
  }

  startMock(templateId){
    chrome.runtime.sendMessage({
      command: 'startMock',
      tabId: chrome.devtools.inspectedWindow.tabId,
      args:{
        host:this.state.host,
        templateId
      }
    })
  }

  stopMock(templateId){
    chrome.runtime.sendMessage({
      command: 'stopMock',
      tabId: chrome.devtools.inspectedWindow.tabId,
      args:{
        host:this.state.host,
        templateId
      }
    })
  }

  fetchTemplateList(){
    return new Promise((resolve, reject) =>{
      chrome.runtime.sendMessage({
        command:'getTemplates',
        tabId:chrome.devtools.inspectedWindow.tabId,
        args:{
          host:this.state.host
        }
      },function(res){
        resolve(res);
      })
    }); 
  }

  render() {
    console.log(this.state);
    if (this.state.host) {
      return (
        <div className={style.mockyApp}>
                { this.state.configPresent && <MockAndRecord saveHAR={this.sendHAR}  startMock={this.startMock}/>}
                { !this.state.configPresent && <MockConfig saveMockConfig={this.updateConfig}/>}
                <Modal header={'Ongoing Mock'} show={this.state.active}>
                    <div className={style.mockStatus}>
                      <div className={style.mockControl}>
                        <Button text={'Stop Mocking'} clickHandler={this.stopMock}/>
                      </div>
                      <div className="mockedRequests">
                      Mocked Requests:(TODO)
                      </div>
                    </div>
                </Modal>
              </div>
      );
    }else{
    return (
      <div className={style.mockyApp}>
                    not a proper url to mock
              </div>
    );
    }
  }
}


function filterData(data) {
  const filtered = data.entries.filter((element) => {
    const contentType = element.response.headers.filter(element => element.name === 'content-type');
    return contentType.value === 'application/json';
  });
  console.log(filtered);
  return filtered;
}

export default Mocky;
