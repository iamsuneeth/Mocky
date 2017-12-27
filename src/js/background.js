import manifest from '../../public/manifest.json';

function createClosure(mockUrl,sendUrl, template){

  function mock(request){
    if(request.url.startsWith(mockUrl)){
      return {redirectUrl: `${sendUrl}?url=${request.url}&template=${template}`};
    }
  };
  return mock;
}


function createListener(func,mockUrl,host){
  chrome.webRequest.onBeforeRequest.addListener(func, { urls: [`*://${host}/*`] }, ['blocking']);
}




chrome.runtime.onMessage.addListener(function(request,sender, sendResponse){
        if(request.command === 'loadBaseConfig'){
          chrome.tabs.get(request.tabId,function(tab){
            const url = new URL(tab.url);
            chrome.storage.local.get(url.hostname, function(result){
              if(result && result[url.hostname]){
                sendResponse(result[url.hostname].config);
              }else{
                sendResponse(url.hostname);
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
            console.log(result, request.args.host);
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
          let mockFunction = createClosure(request.args.mockUrl,request.args.sendUrl,request.args.template);
          createListener(mockFunction,request.args.mockUrl,request.args.host);

        }else if(request.command === 'stopMock'){
          if(chrome.webRequest.onBeforeRequest.hasListener(mock)){
            chrome.webRequest.onBeforeRequest.removeListener(mock);
          }
        }
    
        return true;
    
})