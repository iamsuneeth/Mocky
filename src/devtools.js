chrome.devtools.panels.create("My Panel",
"",
"panel.html",
function(panel) {
  // code invoked on panel creation
  addMessage("panel created");
}
);

var addMessage = function(type, format, args) {
    chrome.extension.sendRequest({
        command: "sendToConsole",
        tabId: chrome.devtools.tabId,
        args: escape(JSON.stringify(Array.prototype.slice.call(arguments, 0)))
    });
};



chrome.devtools.network.getHAR(function(result) {
    var entries = result.entries;
    addMessage(entries);
    if (!entries.length) {
      addMessage("nothing");
    }
  
  });