/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","sap/ui/core/library","./RadioButtonGroupRenderer","sap/base/Log"],function(t,e,i,s,a,n){"use strict";var o=s.TextDirection;var r=s.ValueState;var d=e.extend("sap.m.RadioButtonGroup",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",designtime:"sap/m/designtime/RadioButtonGroup.designtime",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},columns:{type:"int",group:"Appearance",defaultValue:1},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:r.None},selectedIndex:{type:"int",group:"Data",defaultValue:0},enabled:{type:"boolean",group:"Behavior",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:o.Inherit}},defaultAggregation:"buttons",aggregations:{buttons:{type:"sap.m.RadioButton",multiple:true,singularName:"button",bindable:"bindable"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{parameters:{selectedIndex:{type:"int"}}}}}});d.prototype.exit=function(){this.destroyButtons();if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}};d.prototype.onBeforeRendering=function(){var t=this.getButtons();var e=t.length;var i=t.filter(function(t){t._setEditableParent(this.getEditable());return t.getVisible()},this);if(this.getSelectedIndex()>e){n.warning("Invalid index, set to 0");this.setSelectedIndex(0)}i.forEach(function(t,e){t._setPosinset(e);t._setSetsize(i.length)},this)};d.prototype.onAfterRendering=function(){this._initItemNavigation()};d.prototype._initItemNavigation=function(){var t=[];var e=false;var s=this.getEnabled();for(var a=0;a<this.aRBs.length;a++){t.push(this.aRBs[a].getDomRef());e=e||this.aRBs[a].getEnabled()}if(!e||!s){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}return}if(!this._oItemNavigation){this._oItemNavigation=new i;this._oItemNavigation.attachEvent(i.Events.AfterFocus,this._handleAfterFocus,this);this.addDelegate(this._oItemNavigation)}this._oItemNavigation.setRootDomRef(this.getDomRef());this._oItemNavigation.setItemDomRefs(t);this._oItemNavigation.setCycling(true);this._oItemNavigation.setColumns(this.getColumns());this._oItemNavigation.setSelectedIndex(this.getSelectedIndex());this._oItemNavigation.setFocusedIndex(this.getSelectedIndex());this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]})};d.prototype.setSelectedIndex=function(t){var e=this.getSelectedIndex();var i=document.activeElement&&document.activeElement.parentNode&&document.activeElement.parentNode.parentNode===this.getDomRef();var s=!!(this.aRBs&&this.aRBs[t]);if(t<-1){n.warning("Invalid index, will not be changed");return this}this.setProperty("selectedIndex",t,true);if(!isNaN(e)&&this.aRBs&&this.aRBs[e]){this.aRBs[e].setSelected(false)}if(this.aRBs&&this.aRBs[t]){this.aRBs[t].setSelected(true)}if(this._oItemNavigation){this._oItemNavigation.setSelectedIndex(t);this._oItemNavigation.setFocusedIndex(t)}if(s&&i){this.aRBs[t].getDomRef().focus()}return this};d.prototype.setSelectedButton=function(t){var e=this.getButtons();if(t){if(e){for(var i=0;i<e.length;i++){if(t.getId()==e[i].getId()){this.setSelectedIndex(i);break}}}}else{this.setSelectedIndex(-1)}return this};d.prototype.getSelectedButton=function(){return this.getButtons()[this.getSelectedIndex()]};d.prototype.addButton=function(t){if(!this._bUpdateButtons&&this.getSelectedIndex()===undefined){this.setSelectedIndex(0)}if(!this.aRBs){this.aRBs=[]}var e=this.aRBs.length;this.aRBs[e]=this._createRadioButton(t,e);this.addAggregation("buttons",this.aRBs[e]);return this};d.prototype.insertButton=function(t,e){if(!this.aRBs){this.aRBs=[]}var i=this.aRBs.length,s=this.getButtons().length;e=Math.max(Math.min(e,s),0);if(!this._bUpdateButtons){if(this.getSelectedIndex()===undefined||i==0){this.setSelectedIndex(0)}else if(this.getSelectedIndex()>=e){this.setProperty("selectedIndex",this.getSelectedIndex()+1,true)}}if(e>=i){this.aRBs[e]=this._createRadioButton(t,e)}else{for(var a=i;a>e;a--){this.aRBs[a]=this.aRBs[a-1];if(a-1==e){this.aRBs[a-1]=this._createRadioButton(t,e)}}}this.insertAggregation("buttons",t,e);return this};d.prototype._createRadioButton=function(t,e){if(this.iIDCount==undefined){this.iIDCount=0}else{this.iIDCount++}t.setValueState(this.getValueState());t.setGroupName(this.getId());if(e==this.getSelectedIndex()){t.setSelected(true)}t.attachEvent("select",this._handleRBSelect,this);return t};d.prototype.removeButton=function(t){var e=t;if(typeof t=="string"){t=sap.ui.getCore().byId(t)}if(typeof t=="object"){e=this.indexOfButton(t)}var i=this.removeAggregation("buttons",e);if(!this.aRBs){this.aRBs=[]}if(!this.aRBs[e]){return null}this.aRBs.splice(e,1);if(!this._bUpdateButtons){if(this.aRBs.length==0){this.setSelectedIndex(-1)}else if(this.getSelectedIndex()==e){this.setSelectedIndex(0)}else{if(this.getSelectedIndex()>e){this.setProperty("selectedIndex",this.getSelectedIndex()-1,true)}}}return i};d.prototype.removeAllButtons=function(){if(!this._bUpdateButtons){this.setSelectedIndex(-1)}this.aRBs=[];return this.removeAllAggregation("buttons")};d.prototype.destroyButtons=function(){this.destroyAggregation("buttons");if(!this._bUpdateButtons){this.setSelectedIndex(-1)}if(this.aRBs){while(this.aRBs.length>0){this.aRBs[0].destroy();this.aRBs.splice(0,1)}}return this};d.prototype.updateButtons=function(){this._bUpdateButtons=true;this.updateAggregation("buttons");this._bUpdateButtons=undefined};d.prototype.clone=function(){var t=this.getButtons();var i=0;for(i=0;i<t.length;i++){t[i].detachEvent("select",this._handleRBSelect,this)}var s=e.prototype.clone.apply(this,arguments);for(i=0;i<t.length;i++){t[i].attachEvent("select",this._handleRBSelect,this)}return s};d.prototype._handleRBSelect=function(t){for(var e=0;e<this.aRBs.length;e++){if(this.aRBs[e].getId()==t.getParameter("id")&&t.getParameter("selected")){this.setSelectedIndex(e);this.fireSelect({selectedIndex:e});break}}};d.prototype.setValueState=function(t){this.setProperty("valueState",t,false);if(this.aRBs){for(var e=0;e<this.aRBs.length;e++){this.aRBs[e].setValueState(t)}}return this};d.prototype._handleAfterFocus=function(t){var e=t.getParameter("index");var i=t.getParameter("event");if(i.keyCode===undefined){return}if(e!=this.getSelectedIndex()&&!(i.ctrlKey||i.metaKey)&&this.aRBs[e].getEditable()&&this.aRBs[e].getEnabled()&&this.getEditable()&&this.getEnabled()){this.setSelectedIndex(e);this.fireSelect({selectedIndex:e})}};return d});