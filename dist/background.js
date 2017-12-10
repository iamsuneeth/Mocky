/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// chrome.webRequest.onCompleted.addListener(\n//     function(details) {\n//       console.log(details);\n//     },\n//     {urls: [\"<all_urls>\"],types:[\"xmlhttprequest\"]});\n\n\n//     function interceptRequest(request) {\n//         console.log(request);\n//         return { redirectUrl: 'https://stackoverflow.com/digx/' }\n//     }\n//     chrome.webRequest.onBeforeRequest.addListener(interceptRequest, { urls: ['*://stackoverflow.com/*'] }, ['blocking']);\n\nchrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {\n\n  if (request.command === 'storeInterval') {\n    chrome.storage.local.set({ interval: request.args });\n  }\n  if (request.command === 'readInterval') {\n    chrome.storage.local.get('interval', function (result) {\n      sendResponse(result.interval);\n    });\n  }\n  if (request.command === 'saveRule') {\n    chrome.storage.local.get(request.args.host, function (result) {\n      var rules = result[request.args.host];\n      var duplicate = false;\n      if (rules) {\n        for (var i = 0; i < rules.length; i++) {\n          if (rules[i].ruleId === request.args.ruleId) {\n            duplicate = true;\n            break;\n          }\n        }\n\n        if (duplicate) {\n          sendResponse(\"Duplicate\");\n          return;\n        }\n        result[request.args.host].push(request.args);\n        chrome.storage.local.set(result);\n      } else {\n        var _rules = {};\n        _rules[request.args.host] = [request.args];\n        chrome.storage.local.set(_rules);\n      }\n    });\n  }\n\n  return true;\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2JhY2tncm91bmQuanM/OTYxNiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjaHJvbWUud2ViUmVxdWVzdC5vbkNvbXBsZXRlZC5hZGRMaXN0ZW5lcihcbi8vICAgICBmdW5jdGlvbihkZXRhaWxzKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhkZXRhaWxzKTtcbi8vICAgICB9LFxuLy8gICAgIHt1cmxzOiBbXCI8YWxsX3VybHM+XCJdLHR5cGVzOltcInhtbGh0dHByZXF1ZXN0XCJdfSk7XG5cblxuLy8gICAgIGZ1bmN0aW9uIGludGVyY2VwdFJlcXVlc3QocmVxdWVzdCkge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0KTtcbi8vICAgICAgICAgcmV0dXJuIHsgcmVkaXJlY3RVcmw6ICdodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2RpZ3gvJyB9XG4vLyAgICAgfVxuLy8gICAgIGNocm9tZS53ZWJSZXF1ZXN0Lm9uQmVmb3JlUmVxdWVzdC5hZGRMaXN0ZW5lcihpbnRlcmNlcHRSZXF1ZXN0LCB7IHVybHM6IFsnKjovL3N0YWNrb3ZlcmZsb3cuY29tLyonXSB9LCBbJ2Jsb2NraW5nJ10pO1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24ocmVxdWVzdCxzZW5kZXIsIHNlbmRSZXNwb25zZSl7XG4gICAgXG4gICAgICAgIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09ICdzdG9yZUludGVydmFsJyl7XG4gICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtpbnRlcnZhbDpyZXF1ZXN0LmFyZ3N9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVxdWVzdC5jb21tYW5kID09PSAncmVhZEludGVydmFsJyl7XG4gICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdpbnRlcnZhbCcsIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UocmVzdWx0LmludGVydmFsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZihyZXF1ZXN0LmNvbW1hbmQgPT09J3NhdmVSdWxlJykge1xuICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChyZXF1ZXN0LmFyZ3MuaG9zdCwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgIGxldCBydWxlcyA9IHJlc3VsdFtyZXF1ZXN0LmFyZ3MuaG9zdF1cbiAgICAgICAgICAgIGxldCBkdXBsaWNhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmKHJ1bGVzKXtcbiAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxydWxlcy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBpZihydWxlc1tpXS5ydWxlSWQgPT09IHJlcXVlc3QuYXJncy5ydWxlSWQpe1xuICAgICAgICAgICAgICAgICAgZHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICBpZihkdXBsaWNhdGUpe1xuICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZShcIkR1cGxpY2F0ZVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzdWx0W3JlcXVlc3QuYXJncy5ob3N0XS5wdXNoKHJlcXVlc3QuYXJncyk7XG4gICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChyZXN1bHQpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIGxldCBydWxlcyA9IHt9O1xuICAgICAgICAgICAgICBydWxlc1tyZXF1ZXN0LmFyZ3MuaG9zdF0gPSBbcmVxdWVzdC5hcmdzXTtcbiAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHJ1bGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBcbiAgICAgIH0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9iYWNrZ3JvdW5kLmpzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///14\n");

/***/ })

/******/ });