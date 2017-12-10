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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/*!*************************!*\
  !*** ./src/devtools.js ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nchrome.devtools.panels.create(\"My Panel\", \"\", \"panel.html\", function (panel) {\n    // code invoked on panel creation\n    addMessage(\"panel created\");\n});\n\nvar addMessage = function addMessage(type, format, args) {\n    chrome.extension.sendRequest({\n        command: \"sendToConsole\",\n        tabId: chrome.devtools.tabId,\n        args: escape(JSON.stringify(Array.prototype.slice.call(arguments, 0)))\n    });\n};\n\nchrome.devtools.network.getHAR(function (result) {\n    var entries = result.entries;\n    addMessage(entries);\n    if (!entries.length) {\n        addMessage(\"nothing\");\n    }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2RldnRvb2xzLmpzP2M5MTYiXSwic291cmNlc0NvbnRlbnQiOlsiY2hyb21lLmRldnRvb2xzLnBhbmVscy5jcmVhdGUoXCJNeSBQYW5lbFwiLFxuXCJcIixcblwicGFuZWwuaHRtbFwiLFxuZnVuY3Rpb24ocGFuZWwpIHtcbiAgLy8gY29kZSBpbnZva2VkIG9uIHBhbmVsIGNyZWF0aW9uXG4gIGFkZE1lc3NhZ2UoXCJwYW5lbCBjcmVhdGVkXCIpO1xufVxuKTtcblxudmFyIGFkZE1lc3NhZ2UgPSBmdW5jdGlvbih0eXBlLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICBjaHJvbWUuZXh0ZW5zaW9uLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgY29tbWFuZDogXCJzZW5kVG9Db25zb2xlXCIsXG4gICAgICAgIHRhYklkOiBjaHJvbWUuZGV2dG9vbHMudGFiSWQsXG4gICAgICAgIGFyZ3M6IGVzY2FwZShKU09OLnN0cmluZ2lmeShBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKSlcbiAgICB9KTtcbn07XG5cblxuXG5jaHJvbWUuZGV2dG9vbHMubmV0d29yay5nZXRIQVIoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgdmFyIGVudHJpZXMgPSByZXN1bHQuZW50cmllcztcbiAgICBhZGRNZXNzYWdlKGVudHJpZXMpO1xuICAgIGlmICghZW50cmllcy5sZW5ndGgpIHtcbiAgICAgIGFkZE1lc3NhZ2UoXCJub3RoaW5nXCIpO1xuICAgIH1cbiAgXG4gIH0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvZGV2dG9vbHMuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///15\n");

/***/ })

/******/ });