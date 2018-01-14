import manifest from '../../public/manifest.json';
let currentFunc=null;
function createClosure(mockUrl,url, template){
  function mock(request){
    let urlObject = new URL(request.url);
    let parsedUrl = urlObject.pathname.substr(1);
    if(request.type === "xmlhttprequest" && parsedUrl.startsWith(url)){
      return {redirectUrl: `${mockUrl}?url=${request.url}&template=${template}`};
    }
  };
  currentFunc = mock;
  return mock;
}


function createListener(func,mockUrl,host){
  if(host.indexOf(':')!== -1){
    host = host.substring(0,host.indexOf(':'));
  }
  chrome.webRequest.onBeforeRequest.addListener(func, { urls: [`*://${host}/*`] }, ['blocking']);
}




chrome.runtime.onMessage.addListener(function(request,sender, sendResponse){
        if(request.command === 'loadBaseConfig'){
          chrome.tabs.get(request.tabId,function(tab){
            const url = new URL(tab.url);
            chrome.storage.local.get(url.host, function(result){
              if(result && result[url.host]){
                sendResponse(result[url.host].config);
              }else{
                sendResponse(url.host);
              }   
     
            });

          })
        }else if(request.command === 'updateConfig'){
          let config = {[request.args.config.host]:{'config':request.args.config}};
          chrome.storage.local.get(request.args.config.host,function(result){
            let obj = request.args.config;
            if(result[request.args.config.host]){
              result[request.args.config.host].config = obj;
            }else{
              result = config;
            }
            chrome.storage.local.set(result);
            sendResponse(result);
          })
         
        }else if(request.command === 'getTemplates'){
          chrome.storage.local.get(request.args.host, function(result){
            let templates = result[request.args.host].templates;
            if(templates){
              sendResponse(templates);
            }else{
              sendResponse([]);
            }
          });
        }else if(request.command ==='saveTemplate') {
          chrome.storage.local.get(request.args.host, function(result){
            let templates = result[request.args.host].templates;
            let duplicate = false;
            if(templates){
              for(let i=0;i<templates.length;i++){
                if(templates[i].templateId === request.args.templateId){
                  duplicate = true;
                  break;
                }
              }
    
              if(duplicate){
                sendResponse("Duplicate");
                return;
              }
              
              templates.push(request.args);
              result[request.args.host].templates=templates;
              chrome.storage.local.set(result);
              sendResponse('saved');
            }else{
              result[request.args.host].templates = [request.args];
              chrome.storage.local.set(result);
              sendResponse('saved');
            }
          });
        }else if(request.command === 'startMock'){
          let mockFunction = createClosure(request.args.mockUrl,request.args.url,request.args.template);
          createListener(mockFunction,request.args.mockUrl,request.args.host);

        }else if(request.command === 'stopMock'){
          if(chrome.webRequest.onBeforeRequest.hasListener(currentFunc)){
            chrome.webRequest.onBeforeRequest.removeListener(currentFunc);
          }
        }else if(request.command === 'deleteTemplate'){
          chrome.storage.local.get(request.args.host, function(result){
            let templates = result[request.args.host].templates;
            if(templates){
              let newTemplates = templates.filter(elem => {
                return elem.templateId !== request.args.template;
              });
              result[request.args.host].templates = newTemplates;
              chrome.storage.local.set(result);
              sendResponse('deleted');
            }else{
              sendResponse('nothing to delete');
            }
          });
        }
    
        return true;
    
})