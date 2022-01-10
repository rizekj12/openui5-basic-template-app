/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/now","sap/base/util/Version","sap/base/assert","sap/base/Log","sap/ui/dom/getComputedStyleFix","sap/ui/dom/includeScript","sap/ui/dom/includeStylesheet","sap/ui/core/support/Hotkeys","sap/ui/test/RecorderHotkeyListener","sap/ui/security/FrameOptions","sap/ui/performance/Measurement","sap/ui/performance/trace/Interaction","sap/ui/base/syncXHRFix","sap/base/util/LoaderExtensions","sap/ui/Device","sap/ui/thirdparty/jquery","sap/ui/thirdparty/jqueryui/jquery-ui-position","ui5loader-autoconfig","jquery.sap.stubs","sap/ui/thirdparty/URI","sap/ui/events/PasteEventFix"],function(now,Version,assert,Log,getComputedStyleFix,includeScript,includeStylesheet,SupportHotkeys,TestRecorderHotkeyListener,FrameOptions,Measurement,Interaction,syncXHRFix,LoaderExtensions,Device,jQuery){"use strict";if(!jQuery){throw new Error("Loading of jQuery failed")}var ui5loader=sap.ui.loader;if(!ui5loader||!ui5loader._){throw new Error("The UI5 compatilbility module requires a UI5 specific AMD implementation")}var _ui5loader=ui5loader._;var _earlyLogs=[];function _earlyLog(e,r){_earlyLogs.push({level:e,message:r})}var oJQVersion=Version(jQuery.fn.jquery);(function(){jQuery.support=jQuery.support||{};jQuery.support.retina=Device.support.retina;jQuery.support.touch=Device.support.touch;jQuery.support.cssTransforms=true;jQuery.support.cssTransforms3d=true;jQuery.support.cssTransitions=true;jQuery.support.cssAnimations=true;jQuery.support.cssGradients=true;jQuery.support.flexBoxPrefixed=false;jQuery.support.flexBoxLayout=false;jQuery.support.newFlexBoxLayout=true;jQuery.support.hasFlexBoxSupport=true})();if(Device.browser.firefox){getComputedStyleFix()}if(Device.browser.firefox&&window.Proxy){syncXHRFix()}var oCfgData=window["sap-ui-config"]=function(){function e(e){for(var r in e){var o=e[r];var t=r.toLowerCase();if(!e.hasOwnProperty(t)){e[t]=o;delete e[r]}}return e}function r(e){var r="sap-ui-config.json",o;Log.warning('Loading external bootstrap configuration from "'+e+'". This is a design time feature and not for productive usage!');if(e!==r){Log.warning('The external bootstrap configuration file should be named "'+r+'"!')}var t=new XMLHttpRequest;t.addEventListener("load",function(r){if(t.status===200&&t.responseText){try{o=JSON.parse(t.responseText)}catch(r){Log.error('Parsing externalized bootstrap configuration from "'+e+'" failed! Reason: '+r+"!")}}else{Log.error('Loading externalized bootstrap configuration from "'+e+'" failed! Response: '+t.status+"!")}});t.open("GET",e,false);try{t.send()}catch(r){Log.error('Loading externalized bootstrap configuration from "'+e+'" failed! Reason: '+r+"!")}o=o||{};o.__loaded=true;return o}function o(){function e(e,r){var o=e&&e.getAttribute("src");var t=r.exec(o);if(t){return{tag:e,url:o,resourceRoot:t[1]||""}}}var r=/^((?:.*\/)?resources\/)/,o,t,a,s;s=e(document.querySelector("SCRIPT[src][id=sap-ui-bootstrap]"),r);if(!s){t=document.querySelectorAll("SCRIPT[src]");o=/^([^?#]*\/)?(?:sap-ui-(?:core|custom|boot|merged)(?:-[^?#/]*)?|jquery.sap.global|ui5loader(?:-autoconfig)?)\.js(?:[?#]|$)/;for(a=0;a<t.length;a++){s=e(t[a],o);if(s){break}}}return s||{}}var t=o(),a=t.tag,s=window["sap-ui-config"];if(typeof s==="string"){s=r(s)}s=e(s||{});s.resourceroots=s.resourceroots||{};s.themeroots=s.themeroots||{};if(/(^|\/)(sap-?ui5|[^\/]+-all).js([?#]|$)/.test(t.url)){Log.error("The all-in-one file 'sap-ui-core-all.js' has been abandoned in favour of standard preloads."+" Please migrate to sap-ui-core.js and consider to use async preloads.");s.preload="sync"}if(a){var n=a.getAttribute("data-sap-ui-config");if(n){try{var i;try{i=JSON.parse("{"+n+"}")}catch(e){Log.error("JSON.parse on the data-sap-ui-config attribute failed. Please check the config for JSON syntax violations.");i=new Function("return {"+n+"};")()}Object.assign(s,e(i))}catch(e){Log.error("failed to parse data-sap-ui-config attribute: "+(e.message||e))}}for(var u=0;u<a.attributes.length;u++){var l=a.attributes[u];var c=l.name.match(/^data-sap-ui-(.*)$/);if(c){c=c[1].toLowerCase();if(c==="resourceroots"){Object.assign(s[c],JSON.parse(l.value))}else if(c==="theme-roots"){Object.assign(s.themeroots,JSON.parse(l.value))}else if(c!=="config"){s[c]=l.value}}}}return s}();var syncCallBehavior=0;if(oCfgData["xx-nosync"]==="warn"||/(?:\?|&)sap-ui-xx-nosync=(?:warn)/.exec(window.location.search)){syncCallBehavior=1}if(oCfgData["xx-nosync"]===true||oCfgData["xx-nosync"]==="true"||/(?:\?|&)sap-ui-xx-nosync=(?:x|X|true)/.exec(window.location.search)){syncCallBehavior=2}ui5loader.config({reportSyncCalls:syncCallBehavior});if(syncCallBehavior&&oCfgData.__loaded){_earlyLog(syncCallBehavior===1?"warning":"error","[nosync]: configuration loaded via sync XHR")}if(oCfgData.noconflict===true||oCfgData.noconflict==="true"||oCfgData.noconflict==="x"){jQuery.noConflict()}jQuery.sap=jQuery.sap||{};jQuery.sap.Version=Version;jQuery.sap.now=now;var fnMakeLocalStorageAccessor=function(e,r,o){return function(t){try{if(t!=null||r==="string"){if(t){localStorage.setItem(e,r==="boolean"?"X":t)}else{localStorage.removeItem(e)}o(t)}t=localStorage.getItem(e);return r==="boolean"?t==="X":t}catch(r){Log.warning("Could not access localStorage while accessing '"+e+"' (value: '"+t+"', are cookies disabled?): "+r.message)}}};jQuery.sap.debug=fnMakeLocalStorageAccessor.call(this,"sap-ui-debug","",function(e){alert("Usage of debug sources is "+(e?"on":"off")+" now.\nFor the change to take effect, you need to reload the page.")});jQuery.sap.setReboot=fnMakeLocalStorageAccessor.call(this,"sap-ui-reboot-URL","string",function(e){if(e){alert("Next time this app is launched (only once), it will load UI5 from:\n"+e+".\nPlease reload the application page now.")}});jQuery.sap.statistics=fnMakeLocalStorageAccessor.call(this,"sap-ui-statistics","boolean",function(e){alert("Usage of Gateway statistics "+(e?"on":"off")+" now.\nFor the change to take effect, you need to reload the page.")});jQuery.sap.log=Object.assign(Log.getLogger(),{Level:Log.Level,getLogger:Log.getLogger,getLogEntries:Log.getLogEntries,addLogListener:Log.addLogListener,removeLogListener:Log.removeLogListener,logSupportInfo:Log.logSupportInfo,LogLevel:Log.Level,getLog:Log.getLogEntries});var sWindowName=typeof window==="undefined"||window.top==window?"":"["+window.location.pathname.split("/").slice(-1)[0]+"] ";jQuery.sap.assert=function(e,r){if(!e){var o=typeof r==="function"?r():r;assert(e,sWindowName+o)}};oCfgData.loglevel=function(){var e=/(?:\?|&)sap-ui-log(?:L|-l)evel=([^&]*)/.exec(window.location.search);return e&&e[1]}()||oCfgData.loglevel;if(oCfgData.loglevel){Log.setLevel(Log.Level[oCfgData.loglevel.toUpperCase()]||parseInt(oCfgData.loglevel))}else if(!window["sap-ui-optimized"]){Log.setLevel(Log.Level.DEBUG)}Log.info("SAP Logger started.");jQuery.each(_earlyLogs,function(e,r){Log[r.level](r.message)});_earlyLogs=null;jQuery.sap.factory=function e(r){jQuery.sap.assert(typeof r=="object","oPrototype must be an object (incl. null)");function o(){}o.prototype=r;return o};jQuery.sap.newObject=function e(r){jQuery.sap.assert(typeof r=="object","oPrototype must be an object (incl. null)");return Object.create(r||null)};jQuery.sap.getter=function(e){return function(){return e}};jQuery.sap.getObject=function(e,r,o){var t=o||window,a=(e||"").split("."),s=a.length,n=isNaN(r)?0:s-r,i;if(syncCallBehavior&&o===window){Log.error("[nosync] getObject called to retrieve global name '"+e+"'")}for(i=0;t&&i<s;i++){if(!t[a[i]]&&i<n){t[a[i]]={}}t=t[a[i]]}return t};jQuery.sap.setObject=function(e,r,o){var t=o||window,a=(e||"").split("."),s=a.length,n;if(s>0){for(n=0;t&&n<s-1;n++){if(!t[a[n]]){t[a[n]]={}}t=t[a[n]]}t[a[s-1]]=r}};jQuery.sap.measure=Measurement;jQuery.sap.measure.clearInteractionMeasurements=Interaction.clear;jQuery.sap.measure.startInteraction=Interaction.start;jQuery.sap.measure.endInteraction=Interaction.end;jQuery.sap.measure.getPendingInteractionMeasurement=Interaction.getPending;jQuery.sap.measure.filterInteractionMeasurements=Interaction.filter;jQuery.sap.measure.getAllInteractionMeasurements=Interaction.getAll;jQuery.sap.measure.getRequestTimings=function(){if(window.performance.getEntriesByType){return window.performance.getEntriesByType("resource")}return[]};jQuery.sap.measure.clearRequestTimings=function(){if(window.performance.clearResourceTimings){window.performance.clearResourceTimings()}};jQuery.sap.measure.setRequestBufferSize=function(e){if(window.performance.setResourceTimingBufferSize){window.performance.setResourceTimingBufferSize(e)}};var getModuleSystemInfo=function(){var e=_ui5loader.logger=Log.getLogger("sap.ui.ModuleSystem",/sap-ui-xx-debug(M|-m)odule(L|-l)oading=(true|x|X)/.test(location.search)||oCfgData["xx-debugModuleLoading"]?Log.Level.DEBUG:Math.min(Log.getLevel(),Log.Level.INFO)),r=LoaderExtensions.getKnownSubtypes(),o;(function(){var t="";for(var a in r){t=(t?t+"|":"")+"(?:(?:"+r[a].join("\\.|")+"\\.)?"+a+")"}t="\\.(?:"+t+"|[^./]+)$";e.debug("constructed regexp for file sub-types :"+t);o=new RegExp(t)})();function t(e){if(/^jquery\.sap\./.test(e)){return e}return e.replace(/\./g,"/")}jQuery.sap.getModulePath=function(e,r){return jQuery.sap.getResourcePath(t(e),r)};jQuery.sap.getResourcePath=function(e,r){if(arguments.length===1&&e!=""){var t=e.split(/\//);var a=o.exec(t[t.length-1]);if(a){r=a[0];t[t.length-1]=t[t.length-1].slice(0,a.index);e=t.join("/")}else{r=""}}return _ui5loader.getResourcePath(e,r)};jQuery.sap.registerModulePath=function e(r,o){jQuery.sap.assert(!/\//.test(r),"module name must not contain a slash.");r=r.replace(/\./g,"/");o=o||".";LoaderExtensions.registerResourcePath(r,o)};jQuery.sap.registerResourcePath=LoaderExtensions.registerResourcePath;jQuery.sap.registerModuleShims=function(e){jQuery.sap.assert(typeof e==="object","mShims must be an object");ui5loader.config({shim:e})};jQuery.sap.isDeclared=function e(r,o){var a=_ui5loader.getModuleState(t(r)+".js");return a&&(o||a>0)};jQuery.sap.isResourceLoaded=function e(r){return!!_ui5loader.getModuleState(r)};jQuery.sap.getAllDeclaredModules=LoaderExtensions.getAllRequiredModules;var a={};for(var s in oCfgData.resourceroots){a[t(s)]=oCfgData.resourceroots[s]||"."}ui5loader.config({paths:a});var n=_ui5loader.getUrlPrefixes();e.info("URL prefixes set to:");for(var s in n){e.info("  "+(s?"'"+s+"'":"(default)")+" : "+n[s])}jQuery.sap.declare=function(e,r){var o=e;if(typeof e==="object"){o=e.modName;e=t(e.modName)+(e.type?"."+e.type:"")+".js"}else{e=t(e)+".js"}_ui5loader.declareModule(e);if(r!==false){jQuery.sap.getObject(o,1)}};jQuery.sap.require=function(e){if(arguments.length>1){for(var o=0;o<arguments.length;o++){jQuery.sap.require(arguments[o])}return this}if(typeof e==="object"){jQuery.sap.assert(!e.type||r.js.indexOf(e.type)>=0,"type must be empty or one of "+r.js.join(", "));e=t(e.modName)+(e.type?"."+e.type:"")}else{e=t(e)}sap.ui.requireSync(e)};Object.defineProperty(jQuery.sap.require,"_hook",{get:function(){return _ui5loader.translate},set:function(e){jQuery.sap.assert(false,"jquery.sap.global: legacy hook for code transformation should no longer be used");_ui5loader.translate=e}});jQuery.sap.preloadModules=function(e,r,o){Log.error("jQuery.sap.preloadModules was never a public API and has been removed. Migrate to Core.loadLibrary()!")};jQuery.sap.registerPreloadedModules=function(e){var r=e.modules;if(Version(e.version||"1.0").compareTo("2.0")<0){r={};for(var o in e.modules){r[t(o)+".js"]=e.modules[o]}}sap.ui.require.preload(r,e.name,e.url)};jQuery.sap.unloadResources=_ui5loader.unloadResources;jQuery.sap.getResourceName=function(e,r){return t(e)+(r==null?".js":r)};jQuery.sap.loadResource=LoaderExtensions.loadResource;jQuery.sap._loadJSResourceAsync=_ui5loader.loadJSResourceAsync;return function(){return{modules:_ui5loader.getAllModules(),prefixes:_ui5loader.getUrlPrefixes()}}}();jQuery.sap.includeScript=includeScript;jQuery.sap.includeStyleSheet=includeStylesheet;if(!(oCfgData.productive===true||oCfgData.productive==="true"||oCfgData.productive==="x")){SupportHotkeys.init(getModuleSystemInfo,oCfgData);TestRecorderHotkeyListener.init(getModuleSystemInfo,oCfgData)}if(oJQVersion.compareTo("3.6.0")!=0){Log.warning("SAPUI5's default jQuery version is 3.6.0; current version is "+jQuery.fn.jquery+". Please note that we only support version 3.6.0.")}jQuery.sap.FrameOptions=FrameOptions;jQuery.sap.globalEval=function(){eval(arguments[0])};(function(){var e=Device.browser;var r=e.name;if(!jQuery.browser){jQuery.browser=function(e){var r=/(webkit)[ \/]([\w.]+)/,o=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(mozilla)(?:.*? rv:([\w.]+))?/,e=e.toLowerCase(),a=r.exec(e)||o.exec(e)||e.indexOf("compatible")<0&&t.exec(e)||[],s={};if(a[1]){s[a[1]]=true;s.version=a[2]||"0";if(s.webkit){s.safari=true}}return s}(window.navigator.userAgent)}if(r===e.BROWSER.CHROME){jQuery.browser.safari=false;jQuery.browser.chrome=true}else if(r===e.BROWSER.SAFARI){jQuery.browser.safari=true;jQuery.browser.chrome=false}if(r){jQuery.browser.fVersion=e.version;jQuery.browser.mobile=e.mobile}})();return jQuery});