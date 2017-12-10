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

chrome.runtime.onMessage.addListener(function(request,sender, sendResponse){
    
        if (request.command === 'storeInterval'){
          chrome.storage.local.set({interval:request.args});
        }
        if (request.command === 'readInterval'){
          chrome.storage.local.get('interval', function(result){
            sendResponse(result.interval);
          });
        }
        if(request.command ==='saveRule') {
          chrome.storage.local.get(request.args.host, function(result){
            let rules = result[request.args.host]
            let duplicate = false;
            if(rules){
              for(let i=0;i<rules.length;i++){
                if(rules[i].ruleId === request.args.ruleId){
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
              let rules = {};
              rules[request.args.host] = [request.args];
              chrome.storage.local.set(rules);
            }
          });
        }
    
        return true;
    
      })