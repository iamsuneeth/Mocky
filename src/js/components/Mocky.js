import React from 'react';
import MockAndRecord from './mock/MockAndRecord';
import MockConfig from './rules/mock-config';
import TemplateList from './mock/templateList';
import style from './mocky.scss';
import Modal from './common/Modal';
import Button from './common/Button';
import SideBar from '../components/sidebar/SideBar';

let currentFunc = null;
function createListener(func){
  chrome.devtools.network.onRequestFinished.addListener(func);
}

function removeListener(func){
  chrome.devtools.network.onRequestFinished.removeListener(func);
}

function createClosure(sendUrl, template, mockUrl){
  let payload={};
  async function mock(request){
    if(isAPIRequestWithURL(request.request.headers, request.request.url, mockUrl)){
      let promise = new Promise((resolve,reject) => {
        request.getContent(data => {
          resolve(data);
        });
      });
      let content = await promise;
      payload = {
        id: template,
        headers:request.request.headers,
        url:request.request.url,
        response:request.response,
        content
      }
      fetch(sendUrl, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if(res.status===201){
          console.log('created');
        }
      }).catch(err => {
        console.log('failed');
      })
    }
  };
  currentFunc = mock;
  return mock;
}

function isAPIRequestWithURL(headers,url, mockUrl){
  let host,contentType,request;
  let parsedUrl = new URL(url);
  headers.map((elem) => {
    if(elem.name === 'Host'){
        host = elem.value
    }else if(elem.name === 'Content-Type'){
        contentType = elem.value
    }else if(elem.name === 'x-requested-with'){
        request = elem.value;
    }
  });

  if(contentType !== 'application/json'&& request != 'XMLHttpRequest'){
    return false;
  }

  if(!parsedUrl.pathname.startsWith(`/${mockUrl}`)){
    return false;
  }

  return true;
}

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
      active:false,
      templates:[],
      page:'mock',
      mockOn:false,
      currentTemplate:''
    };
    this.updateConfig = this.updateConfig.bind(this);
    this.sendHAR = this.sendHAR.bind(this);
    this.fetchTemplateList = this.fetchTemplateList.bind(this);
    this.startMock = this.startMock.bind(this);
    this.startMock = this.startMock.bind(this);
    this.startMock = this.startMock.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
    this.setPage = this.setPage.bind(this);
    this.record = this.record.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
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
      this.fetchTemplateList().then((res) => {
        this.setState({
            templates:res
        });
      });
    } );

  }

  record(templateId,url){
    let mock = createClosure(this.state.sendUrl,templateId,url);
    createListener(mock);
    chrome.runtime.sendMessage({
      command: 'saveTemplate',
      tabId: chrome.devtools.inspectedWindow.tabId,
      args: {
        host:this.state.host,
        templateId,
        url,
      },
    }, async function(res) {
      console.log(res);
      let templates = await this.fetchTemplateList();
      this.setState({ 
        templates
      });
    }.bind(this));
  }

  stopRecord(){
    removeListener(currentFunc);
  }


  sendHAR(templateId,url) {
    let host = this.state.host;
    let loadTemplates = this.fetchTemplateList;
    return new Promise((resolve, reject) => {
      chrome.devtools.network.getHAR((result) => {
        if (!result) {
          reject('error');
        } else {
          const payload = {
            id: templateId,
            host,
            url,
            har: JSON.stringify(result.entries),
          };
          fetch(this.state.sendUrl, {
            method: 'post',
            body: payload,
          }).then((response) => {
            let jsonResponse = response.json();
            if(!response.status===201){
              reject('error');
            }
            return jsonResponse;
          }).then((response) => {
            chrome.runtime.sendMessage({
              command: 'saveTemplate',
              tabId: chrome.devtools.inspectedWindow.tabId,
              args: {
                host,
                templateId,
                url,
              },
            }, (res) => {
              console.log(res);
              resolve(res);
            });
          }).catch((error) => {
            console.log(error);
            reject(error);
          })
        }
      });
    }).then(function(res){
      this.fetchTemplateList().then((res) => {
        this.setState({
            templates:res
        });
      })
    }.bind(this))
    .catch(function(error){
      console.log(error);
      this.setState({
        error:error.toString()
      });
    }.bind(this));
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
    return new Promise((resolve,reject)=>{
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
          resolve();
        }else {
          this.setState({
            error: '',
          });
          reject();
        }
      });
    });
    
  }

  startMock(templateId){
    if(this.state.mockOn){
      chrome.runtime.sendMessage({
        command: 'stopMock',
        tabId: chrome.devtools.inspectedWindow.tabId,
        args: {
          host: this.state.host,
          templateId
        }
      });
      this.setState({
        mockOn:false,
        currentTemplate:''
      });
    }else{
      chrome.runtime.sendMessage({
        command: 'startMock',
        tabId: chrome.devtools.inspectedWindow.tabId,
        args:{
          host:this.state.host,
          sendUrl:this.state.sendUrl,
          mockUrl:this.state.mockUrl,
          template:templateId
        }
      });
      this.setState({
        mockOn:true,
        currentTemplate:templateId
      });
    }
    
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
        if(res)
          resolve(res);
        else
          reject(res);
      })
    }); 
  }

  renderComponent(){
    switch(this.state.page){
      case 'mock':
        return <MockAndRecord startRecord={this.record} stopRecord={this.stopRecord}/>;
      case 'config':
        return <MockConfig saveMockConfig={this.updateConfig} mockUrl={this.state.mockUrl} sendUrl={this.state.sendUrl} />;
      case 'template':
        return <TemplateList templates={this.state.templates} startMock={this.startMock} status={this.state.mockOn} template={this.state.currentTemplate} />;
      default:
        return <MockAndRecord saveHAR={this.sendHAR} />;
    }
  }

  setPage(page){
    this.setState({
      page
    });
  }

  render() {
    console.log(this.state);
    if (this.state.host) {
      return (
        <div className={style.mockyApp}>
                <div className={style.sidePage}>
                  <SideBar clickHandler={this.setPage} selected={this.state.page}/>
                </div>
                <div className={style.mainPage}>
                    {this.renderComponent()}
                </div>
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

export default Mocky;
