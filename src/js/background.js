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