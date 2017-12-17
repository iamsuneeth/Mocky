

// chrome.webRequest.onCompleted.addListener(
//     function(details) {
//       console.log(details);
//     },
//     {urls: ["<all_urls>"],types:["xmlhttprequest"]});


//     function interceptRequest(request) {
//         console.log(request);
//         return { redirectUrl: 'https://stackoverflow.com/digx/' }
//     }
//     chrome.webRequest.onBeforeRequest.addListener(interceptRequest, { urls: ['*://stackoverflow.com/*'] }, ['blocking']);


/**
 * 1. create listener factory using promise to enclose templateId, mockurl and sendUrl in a closure
 * 2. change all promise to async await 
 */
function createClosure(mockUrl,sendUrl){

  function mock(request){
    if(request.url.startsWith(mockUrl)){
      return {redirectUrl: sendUrl};
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
              if(result && result.hostname){
                sendResponse(result);
              }else{
                sendResponse(url.hostname);
              }   
     
            });

          })
        }else if(request.command === 'updateConfig'){
          let config = {[request.args.config.host]:request.args.config};
          chrome.storage.local.set(config);
        }else if(request.command === 'getTemplates'){
          chrome.storage.local.get(request.args.host, function(result){
            let templates = result[request.args.host]
            if(templates){
              sendResponse(templates);
            }else{
              sendResponse([]);
            }
          });
        }else if(request.command ==='saveTemplate') {
          chrome.storage.local.get(request.args.host, function(result){
            let templates = result[request.args.host]
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
              result[request.args.host].push(request.args);
              chrome.storage.local.set(result);
            }else{
              let templates = {};
              templates[request.args.host] = [request.args];
              chrome.storage.local.set(templates);
            }
          });
        }else if(request.command === 'startMock'){
          let mockFunction = createClosure(request.args.mockUrl,request.args.sendUrl);
          createListener(mockFunction,request.args.mockUrl,request.args.host);

        }else if(request.command === 'stopMock'){
          if(chrome.webRequest.onBeforeRequest.hasListener(mock)){
            chrome.webRequest.onBeforeRequest.removeListener(mock);
          }
        }
    
        return true;
    
})