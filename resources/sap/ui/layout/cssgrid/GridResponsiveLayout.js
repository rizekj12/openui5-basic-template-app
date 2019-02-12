/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/cssgrid/GridLayoutBase","sap/ui/Device"],function(t,e){"use strict";var i=t.extend("sap.ui.layout.cssgrid.GridResponsiveLayout",{metadata:{library:"sap.ui.layout",aggregations:{layout:{type:"sap.ui.layout.cssgrid.GridSettings",multiple:false},layoutS:{type:"sap.ui.layout.cssgrid.GridSettings",multiple:false},layoutM:{type:"sap.ui.layout.cssgrid.GridSettings",multiple:false},layoutL:{type:"sap.ui.layout.cssgrid.GridSettings",multiple:false},layoutXL:{type:"sap.ui.layout.cssgrid.GridSettings",multiple:false}},events:{layoutChange:{parameters:{layout:{type:"string"}}}}}});i.prototype.init=function(){this._sActiveLayout="layout"};i.prototype.getActiveGridSettings=function(){return this.getAggregation(this._sActiveLayout)};i.prototype.isResponsive=function(){return true};i.prototype.onGridAfterRendering=function(t){this.setActiveLayout(t,false)};i.prototype.onGridResize=function(t){if(!t||t.size.width===0){return}this.setActiveLayout(t.control,true)};i.prototype.applySizeClass=function(t,e){var s;if(t.hasClass(e)){return}s=Object.keys(i.mSizeClasses).map(function(t){return i.mSizeClasses[t]});t.removeClass(s.join(" "));t.addClass(e)};i.prototype.setActiveLayout=function(t,s){var a=e.media.getCurrentRange("StdExt",t.$().width()),o=i.mSizeLayouts[a.name],u=this._getLayoutToApply(o);this.applySizeClass(t.$(),i.mSizeClasses[a.name]);if(this._sActiveLayout===u){return}this._sActiveLayout=u;if(s){this.fireLayoutChange({layout:u})}};i.prototype._getLayoutToApply=function(t){if(this.getAggregation(t)){return t}else{return"layout"}};i.mSizeClasses={Phone:"sapUiLayoutCSSGridS",Tablet:"sapUiLayoutCSSGridM",Desktop:"sapUiLayoutCSSGridL",LargeDesktop:"sapUiLayoutCSSGridXL"};i.mSizeLayouts={Phone:"layoutS",Tablet:"layoutM",Desktop:"layoutL",LargeDesktop:"layoutXL"};return i});