!function(window,document,fabric){"use strict";function extend(b,a){var prop;if(void 0===b)return a;for(prop in a)a.hasOwnProperty(prop)&&b.hasOwnProperty(prop)===!1&&(b[prop]=a[prop]);return b}function Darkroom(element,options,plugins){return this.init(element,options,plugins)}function Plugin(darkroom,options){this.darkroom=darkroom,this.options=extend(options,this.defaults),this.initialize()}function Toolbar(element){this.element=element,this.actionsElement=element.querySelector(".darkroom-toolbar-actions")}function ButtonGroup(element){this.element=element}function Button(element){this.element=element}window.Darkroom=Darkroom,Darkroom.plugins=[],Plugin.prototype={defaults:{},initialize:function(){}},Plugin.extend=function(protoProps){var child,parent=this;child=protoProps&&protoProps.hasOwnProperty("constructor")?protoProps.constructor:function(){return parent.apply(this,arguments)},extend(child,parent);var Surrogate=function(){this.constructor=child};return Surrogate.prototype=parent.prototype,child.prototype=new Surrogate,protoProps&&extend(child.prototype,protoProps),child.__super__=parent.prototype,child},Darkroom.Plugin=Plugin,Toolbar.prototype.createButtonGroup=function(){var buttonGroup=document.createElement("li");return buttonGroup.className="darkroom-button-group",this.actionsElement.appendChild(buttonGroup),new ButtonGroup(buttonGroup)},ButtonGroup.prototype.createButton=function(options){var defaults={image:"help",type:"default",group:"default",hide:!1,disabled:!1};options=extend(options,defaults);var button=document.createElement("button");button.className="darkroom-button darkroom-button-"+options.type,button.innerHTML='<i class="darkroom-icon-'+options.image+'"></i>',this.element.appendChild(button);var button=new Button(button);return button.hide(options.hide),button.disable(options.disabled),button},Button.prototype={addEventListener:function(eventName,callback){var el=this.element;el.addEventListener?el.addEventListener(eventName,callback):el.attachEvent&&el.attachEvent("on"+eventName,callback)},active:function(value){value?this.element.classList.add("darkroom-button-active"):this.element.classList.remove("darkroom-button-active")},hide:function(value){value?this.element.classList.add("darkroom-button-hidden"):this.element.classList.remove("darkroom-button-hidden")},disable:function(value){this.element.disabled=value?!0:!1}};var Canvas=fabric.util.createClass(fabric.Canvas,{});Darkroom.prototype={defaults:{minWidth:null,minHeight:null,maxWidth:null,maxHeight:null,plugins:{},init:function(){}},addEventListener:function(eventName,callback){var el=this.canvas.getElement();el.addEventListener?el.addEventListener(eventName,callback):el.attachEvent&&el.attachEvent("on"+eventName,callback)},dispatchEvent:function(eventName){var event=document.createEvent("Event");event.initEvent(eventName,!0,!0),this.canvas.getElement().dispatchEvent(event)},init:function(element,options,plugins){var _this=this;if(this.options=extend(options,this.defaults),"string"==typeof element&&(element=document.querySelector(element)),null!==element){var plugins=plugins||Darkroom.plugins,image=new Image;image.onload=function(){_this.createFabricImage(element).initDOM(element).initPlugins(plugins),_this.options.init.bind(_this).call()},image.src=element.src}},initDOM:function(element){var toolbar=document.createElement("div");toolbar.className="darkroom-toolbar",toolbar.innerHTML='<ul class="darkroom-toolbar-actions"></ul>';var canvas=document.createElement("canvas"),canvasContainer=document.createElement("div");return canvasContainer.className="darkroom-image-container",canvasContainer.appendChild(canvas),this.container=document.createElement("div"),this.container.className="darkroom-container",this.container.appendChild(toolbar),this.container.appendChild(canvasContainer),element.parentNode.replaceChild(this.container,element),this.toolbar=new Toolbar(toolbar),this.canvas=new Canvas(canvas,{selection:!1,backgroundColor:"#ccc"}),this.canvas.setWidth(this.image.getWidth()),this.canvas.setHeight(this.image.getHeight()),this.canvas.add(this.image),this.canvas.centerObject(this.image),this.image.setCoords(),this},createFabricImage:function(imgElement){var width=imgElement.width,height=imgElement.height,scaleMin=1,scaleMax=1,scaleX=1,scaleY=1;null!==this.options.maxWidth&&this.options.maxWidth<width&&(scaleX=this.options.maxWidth/width),null!==this.options.maxHeight&&this.options.maxHeight<height&&(scaleY=this.options.maxHeight/height),scaleMin=Math.min(scaleX,scaleY),scaleX=1,scaleY=1,null!==this.options.minWidth&&this.options.minWidth>width&&(scaleX=this.options.minWidth/width),null!==this.options.minHeight&&this.options.minHeight>height&&(scaleY=this.options.minHeight/height),scaleMax=Math.max(scaleX,scaleY);var scale=scaleMax*scaleMin;return width*=scale,height*=scale,this.image=new fabric.Image(imgElement,{selectable:!1,evented:!1,lockMovementX:!0,lockMovementY:!0,lockRotation:!0,lockScalingX:!0,lockScalingY:!0,lockUniScaling:!0,hasControls:!1,hasBorders:!1}),this.image.setScaleX(scale),this.image.setScaleY(scale),this},initPlugins:function(plugins){this.plugins={};for(var name in plugins){var plugin=plugins[name],options=this.options.plugins[name];options!==!1&&(this.plugins[name]=new plugin(this,options))}},getPlugin:function(name){return this.plugins[name]},selfDestroy:function(){var container=this.container,image=new Image;image.onload=function(){container.parentNode.replaceChild(image,container)},image.src=this.snapshotImage()},snapshotImage:function(){return this.image.toDataURL()}}}(window,window.document,fabric),function(window,document,Darkroom,fabric){"use strict";Darkroom.plugins.history=Darkroom.Plugin.extend({initialize:function(){this._initButtons(),this.backHistoryStack=[],this.forwardHistoryStack=[],this._snapshotImage(),this.darkroom.addEventListener("image:change",this._onImageChange.bind(this))},goBack:function(){0!==this.backHistoryStack.length&&(this.forwardHistoryStack.push(this.currentImage),this.currentImage=this.backHistoryStack.pop(),this._applyImage(this.currentImage),this._updateButtons())},goForward:function(){0!==this.forwardHistoryStack.length&&(this.backHistoryStack.push(this.currentImage),this.currentImage=this.forwardHistoryStack.pop(),this._applyImage(this.currentImage),this._updateButtons())},_initButtons:function(){var buttonGroup=this.darkroom.toolbar.createButtonGroup();return this.backButton=buttonGroup.createButton({image:"back",disabled:!0}),this.forwardButton=buttonGroup.createButton({image:"forward",disabled:!0}),this.backButton.addEventListener("click",this.goBack.bind(this)),this.forwardButton.addEventListener("click",this.goForward.bind(this)),this},_updateButtons:function(){this.backButton.disable(0===this.backHistoryStack.length),this.forwardButton.disable(0===this.forwardHistoryStack.length)},_snapshotImage:function(){var image=new Image;image.src=this.darkroom.snapshotImage(),this.currentImage=image},_onImageChange:function(){this.backHistoryStack.push(this.currentImage),this._snapshotImage(),this.forwardHistoryStack.length=0,this._updateButtons()},_applyImage:function(image){var canvas=this.darkroom.canvas,imgInstance=new fabric.Image(image,{selectable:!1,evented:!1,lockMovementX:!0,lockMovementY:!0,lockRotation:!0,lockScalingX:!0,lockScalingY:!0,lockUniScaling:!0,hasControls:!1,hasBorders:!1});canvas.setWidth(image.width),canvas.setHeight(image.height),this.darkroom.image.remove(),this.darkroom.image=imgInstance,canvas.add(imgInstance)}})}(window,document,Darkroom,fabric),function(window,document,Darkroom){"use strict";Darkroom.plugins.rotate=Darkroom.Plugin.extend({initialize:function(){var buttonGroup=this.darkroom.toolbar.createButtonGroup();this.leftButton=buttonGroup.createButton({image:"rotate-left"}),this.rightButton=buttonGroup.createButton({image:"rotate-right"}),this.leftButton.addEventListener("click",this.rotateLeft.bind(this)),this.rightButton.addEventListener("click",this.rotateRight.bind(this))},rotateLeft:function(){this.rotate(-90)},rotateRight:function(){this.rotate(90)},rotate:function(angle){var darkroom=this.darkroom,canvas=darkroom.canvas,image=darkroom.image;angle=(image.getAngle()+angle)%360;var width,height;Math.abs(angle)%180?(height=image.getWidth(),width=image.getHeight()):(width=image.getWidth(),height=image.getHeight()),canvas.setWidth(width),canvas.setHeight(height),image.rotate(angle),canvas.centerObject(image),image.setCoords(),canvas.renderAll(),darkroom.dispatchEvent("image:change")}})}(window,document,Darkroom,fabric),function(window,document,Darkroom,fabric){"use strict";var CropZone=fabric.util.createClass(fabric.Rect,{_render:function(ctx){this.callSuper("_render",ctx);var dashWidth=(ctx.canvas,7),flipX=this.flipX?-1:1,flipY=this.flipY?-1:1,scaleX=flipX/this.scaleX,scaleY=flipY/this.scaleY;ctx.scale(scaleX,scaleY),ctx.fillStyle="rgba(0, 0, 0, 0.5)",this._renderOverlay(ctx),void 0!==ctx.setLineDash?ctx.setLineDash([dashWidth,dashWidth]):void 0!==ctx.mozDash&&(ctx.mozDash=[dashWidth,dashWidth]),ctx.strokeStyle="rgba(0, 0, 0, 0.2)",this._renderBorders(ctx),this._renderGrid(ctx),ctx.lineDashOffset=dashWidth,ctx.strokeStyle="rgba(255, 255, 255, 0.4)",this._renderBorders(ctx),this._renderGrid(ctx),ctx.scale(1/scaleX,1/scaleY)},_renderOverlay:function(ctx){var canvas=ctx.canvas,borderOffset=0,x0=Math.ceil(-this.getWidth()/2-this.getLeft()),x1=Math.ceil(-this.getWidth()/2),x2=Math.ceil(this.getWidth()/2),x3=Math.ceil(this.getWidth()/2+(canvas.width-this.getWidth()-this.getLeft())),y0=Math.ceil(-this.getHeight()/2-this.getTop()),y1=Math.ceil(-this.getHeight()/2),y2=Math.ceil(this.getHeight()/2),y3=Math.ceil(this.getHeight()/2+(canvas.height-this.getHeight()-this.getTop()));ctx.fillRect(x0,y0,x3-x0,y1-y0+borderOffset),ctx.fillRect(x0,y1,x1-x0,y2-y1+borderOffset),ctx.fillRect(x2,y1,x3-x2,y2-y1+borderOffset),ctx.fillRect(x0,y2,x3-x0,y3-y2)},_renderBorders:function(ctx){ctx.beginPath(),ctx.moveTo(-this.getWidth()/2,-this.getHeight()/2),ctx.lineTo(this.getWidth()/2,-this.getHeight()/2),ctx.lineTo(this.getWidth()/2,this.getHeight()/2),ctx.lineTo(-this.getWidth()/2,this.getHeight()/2),ctx.lineTo(-this.getWidth()/2,-this.getHeight()/2),ctx.stroke()},_renderGrid:function(ctx){ctx.beginPath(),ctx.moveTo(-this.getWidth()/2+1/3*this.getWidth(),-this.getHeight()/2),ctx.lineTo(-this.getWidth()/2+1/3*this.getWidth(),this.getHeight()/2),ctx.stroke(),ctx.beginPath(),ctx.moveTo(-this.getWidth()/2+2/3*this.getWidth(),-this.getHeight()/2),ctx.lineTo(-this.getWidth()/2+2/3*this.getWidth(),this.getHeight()/2),ctx.stroke(),ctx.beginPath(),ctx.moveTo(-this.getWidth()/2,-this.getHeight()/2+1/3*this.getHeight()),ctx.lineTo(this.getWidth()/2,-this.getHeight()/2+1/3*this.getHeight()),ctx.stroke(),ctx.beginPath(),ctx.moveTo(-this.getWidth()/2,-this.getHeight()/2+2/3*this.getHeight()),ctx.lineTo(this.getWidth()/2,-this.getHeight()/2+2/3*this.getHeight()),ctx.stroke()}});Darkroom.plugins.crop=Darkroom.Plugin.extend({startX:null,startY:null,isKeyCroping:!1,isKeyLeft:!1,isKeyUp:!1,defaults:{minHeight:1,minWidth:1,ratio:null,quickCropKey:!1},initialize:function(){var buttonGroup=this.darkroom.toolbar.createButtonGroup();this.cropButton=buttonGroup.createButton({image:"crop"}),this.okButton=buttonGroup.createButton({image:"accept",type:"success",hide:!0}),this.cancelButton=buttonGroup.createButton({image:"cancel",type:"danger",hide:!0}),this.cropButton.addEventListener("click",this.toggleCrop.bind(this)),this.okButton.addEventListener("click",this.cropCurrentZone.bind(this)),this.cancelButton.addEventListener("click",this.releaseFocus.bind(this)),this.darkroom.canvas.on("mouse:down",this.onMouseDown.bind(this)),this.darkroom.canvas.on("mouse:move",this.onMouseMove.bind(this)),this.darkroom.canvas.on("mouse:up",this.onMouseUp.bind(this)),this.darkroom.canvas.on("object:moving",this.onObjectMoving.bind(this)),this.darkroom.canvas.on("object:scaling",this.onObjectScaling.bind(this)),fabric.util.addListener(fabric.document,"keydown",this.onKeyDown.bind(this)),fabric.util.addListener(fabric.document,"keyup",this.onKeyUp.bind(this)),this.darkroom.addEventListener("image:change",this.releaseFocus.bind(this))},onObjectMoving:function(event){if(this.hasFocus()){var currentObject=event.target;if(currentObject===this.cropZone){var canvas=this.darkroom.canvas,x=currentObject.getLeft(),y=currentObject.getTop(),w=currentObject.getWidth(),h=currentObject.getHeight(),maxX=canvas.getWidth()-w,maxY=canvas.getHeight()-h;0>x&&currentObject.set("left",0),0>y&&currentObject.set("top",0),x>maxX&&currentObject.set("left",maxX),y>maxY&&currentObject.set("top",maxY),this.darkroom.dispatchEvent("crop:update")}}},onObjectScaling:function(event){if(this.hasFocus()){var preventScaling=!1,currentObject=event.target;if(currentObject===this.cropZone){var canvas=this.darkroom.canvas,pointer=canvas.getPointer(event.e),minX=(pointer.x,pointer.y,currentObject.getLeft()),minY=currentObject.getTop(),maxX=currentObject.getLeft()+currentObject.getWidth(),maxY=currentObject.getTop()+currentObject.getHeight();if(null!==this.options.ratio&&(0>minX||maxX>canvas.getWidth()||0>minY||maxY>canvas.getHeight())&&(preventScaling=!0),0>minX||maxX>canvas.getWidth()||preventScaling){var lastScaleX=this.lastScaleX||1;currentObject.setScaleX(lastScaleX)}if(0>minX&&currentObject.setLeft(0),0>minY||maxY>canvas.getHeight()||preventScaling){var lastScaleY=this.lastScaleY||1;currentObject.setScaleY(lastScaleY)}0>minY&&currentObject.setTop(0),currentObject.getWidth()<this.options.minWidth&&currentObject.scaleToWidth(this.options.minWidth),currentObject.getHeight()<this.options.minHeight&&currentObject.scaleToHeight(this.options.minHeight),this.lastScaleX=currentObject.getScaleX(),this.lastScaleY=currentObject.getScaleY(),this.darkroom.dispatchEvent("crop:update")}}},onMouseDown:function(event){if(this.hasFocus()){var canvas=this.darkroom.canvas;canvas.calcOffset();var pointer=canvas.getPointer(event.e),x=pointer.x,y=pointer.y,point=new fabric.Point(x,y),activeObject=canvas.getActiveObject();activeObject===this.cropZone||this.cropZone.containsPoint(point)||(canvas.discardActiveObject(),this.cropZone.setWidth(0),this.cropZone.setHeight(0),this.cropZone.setScaleX(1),this.cropZone.setScaleY(1),this.startX=x,this.startY=y)}},onMouseMove:function(event){if(this.isKeyCroping)return this.onMouseMoveKeyCrop(event);if(null!==this.startX&&null!==this.startY){var canvas=this.darkroom.canvas,pointer=canvas.getPointer(event.e),x=pointer.x,y=pointer.y;this._renderCropZone(this.startX,this.startY,x,y)}},onMouseMoveKeyCrop:function(event){var canvas=this.darkroom.canvas,zone=this.cropZone,pointer=canvas.getPointer(event.e),x=pointer.x,y=pointer.y;zone.left&&zone.top||(zone.setTop(y),zone.setLeft(x)),this.isKeyLeft=x<zone.left+zone.width/2,this.isKeyUp=y<zone.top+zone.height/2,this._renderCropZone(Math.min(zone.left,x),Math.min(zone.top,y),Math.max(zone.left+zone.width,x),Math.max(zone.top+zone.height,y))},onMouseUp:function(){if(null!==this.startX&&null!==this.startY){var canvas=this.darkroom.canvas;this.cropZone.setCoords(),canvas.setActiveObject(this.cropZone),canvas.calcOffset(),this.startX=null,this.startY=null}},onKeyDown:function(event){!1===this.options.quickCropKey||event.keyCode!==this.options.quickCropKey||this.isKeyCroping||(this.isKeyCroping=!0,this.darkroom.canvas.discardActiveObject(),this.cropZone.setWidth(0),this.cropZone.setHeight(0),this.cropZone.setScaleX(1),this.cropZone.setScaleY(1),this.cropZone.setTop(0),this.cropZone.setLeft(0))},onKeyUp:function(event){!1!==this.options.quickCropKey&&event.keyCode===this.options.quickCropKey&&this.isKeyCroping&&(this.isKeyCroping=!1,this.startX=1,this.startY=1,this.onMouseUp())},selectZone:function(x,y,width,height,forceDimension){this.hasFocus()||this.requireFocus(),forceDimension?this.cropZone.set({left:x,top:y,width:width,height:height}):this._renderCropZone(x,y,x+width,y+height);var canvas=this.darkroom.canvas;canvas.bringToFront(this.cropZone),this.cropZone.setCoords(),canvas.setActiveObject(this.cropZone),canvas.calcOffset(),this.darkroom.dispatchEvent("crop:update")},toggleCrop:function(){this.hasFocus()?this.releaseFocus():this.requireFocus()},cropCurrentZone:function(){if(this.hasFocus()&&!(this.cropZone.width<1&&this.cropZone.height<1)){var _this=this,darkroom=this.darkroom,canvas=darkroom.canvas;this.cropZone.visible=!1;var image=new Image;image.onload=function(){if(!(this.height<1||this.width<1)){var imgInstance=new fabric.Image(this,{selectable:!1,evented:!1,lockMovementX:!0,lockMovementY:!0,lockRotation:!0,lockScalingX:!0,lockScalingY:!0,lockUniScaling:!0,hasControls:!1,hasBorders:!1}),width=this.width,height=this.height;canvas.setWidth(width),canvas.setHeight(height),_this.darkroom.image.remove(),_this.darkroom.image=imgInstance,canvas.add(imgInstance),darkroom.dispatchEvent("image:change")}},image.src=canvas.toDataURL({left:this.cropZone.getLeft(),top:this.cropZone.getTop(),width:this.cropZone.getWidth(),height:this.cropZone.getHeight()})}},hasFocus:function(){return void 0!==this.cropZone},requireFocus:function(){this.cropZone=new CropZone({fill:"transparent",hasBorders:!1,originX:"left",originY:"top",cornerColor:"#444",cornerSize:8,transparentCorners:!1,lockRotation:!0,hasRotatingPoint:!1}),null!==this.options.ratio&&this.cropZone.set("lockUniScaling",!0),this.darkroom.canvas.add(this.cropZone),this.darkroom.canvas.defaultCursor="crosshair",this.cropButton.active(!0),this.okButton.hide(!1),this.cancelButton.hide(!1)},releaseFocus:function(){void 0!==this.cropZone&&(this.cropZone.remove(),this.cropZone=void 0,this.cropButton.active(!1),this.okButton.hide(!0),this.cancelButton.hide(!0),this.darkroom.canvas.defaultCursor="default",this.darkroom.dispatchEvent("crop:update"))},_renderCropZone:function(fromX,fromY,toX,toY){var canvas=this.darkroom.canvas,isRight=toX>fromX,isLeft=!isRight,isDown=toY>fromY,isUp=!isDown,minWidth=Math.min(+this.options.minWidth,canvas.getWidth()),minHeight=Math.min(+this.options.minHeight,canvas.getHeight()),leftX=Math.min(fromX,toX),rightX=Math.max(fromX,toX),topY=Math.min(fromY,toY),bottomY=Math.max(fromY,toY);leftX=Math.max(0,leftX),rightX=Math.min(canvas.getWidth(),rightX),topY=Math.max(0,topY),bottomY=Math.min(canvas.getHeight(),bottomY),minWidth>rightX-leftX&&(isRight?rightX=leftX+minWidth:leftX=rightX-minWidth),minHeight>bottomY-topY&&(isDown?bottomY=topY+minHeight:topY=bottomY-minHeight),0>leftX&&(rightX+=Math.abs(leftX),leftX=0),rightX>canvas.getWidth()&&(leftX-=rightX-canvas.getWidth(),rightX=canvas.getWidth()),0>topY&&(bottomY+=Math.abs(topY),topY=0),bottomY>canvas.getHeight()&&(topY-=bottomY-canvas.getHeight(),bottomY=canvas.getHeight());var width=rightX-leftX,height=bottomY-topY,currentRatio=width/height;if(this.options.ratio&&+this.options.ratio!==currentRatio){var ratio=+this.options.ratio;if(this.isKeyCroping&&(isLeft=this.isKeyLeft,isUp=this.isKeyUp),ratio>currentRatio){var newWidth=height*ratio;isLeft&&(leftX-=newWidth-width),width=newWidth}else if(currentRatio>ratio){var newHeight=height/(ratio*height/width);isUp&&(topY-=newHeight-height),height=newHeight}if(0>leftX&&(leftX=0),0>topY&&(topY=0),leftX+width>canvas.getWidth()){var newWidth=canvas.getWidth()-leftX;height=newWidth*height/width,width=newWidth,isUp&&(topY=fromY-height)}if(topY+height>canvas.getHeight()){var newHeight=canvas.getHeight()-topY;width=width*newHeight/height,height=newHeight,isLeft&&(leftX=fromX-width)}}this.cropZone.left=leftX,this.cropZone.top=topY,this.cropZone.width=width,this.cropZone.height=height,this.darkroom.canvas.bringToFront(this.cropZone),this.darkroom.dispatchEvent("crop:update")}})}(window,document,Darkroom,fabric),function(window,document,Darkroom){"use strict";Darkroom.plugins.save=Darkroom.Plugin.extend({defaults:{callback:function(){this.darkroom.selfDestroy()}},initialize:function(){var buttonGroup=this.darkroom.toolbar.createButtonGroup();this.destroyButton=buttonGroup.createButton({image:"save"}),this.destroyButton.addEventListener("click",this.options.callback.bind(this))}})}(window,document,Darkroom);
//# sourceMappingURL=darkroom.min.js.map