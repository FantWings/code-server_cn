parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"i8TM":[function(require,module,exports) {

var t,e,n=module.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}function u(t){if(e===clearTimeout)return clearTimeout(t);if((e===o||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{return e(t)}catch(n){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(n){t=r}try{e="function"==typeof clearTimeout?clearTimeout:o}catch(n){e=o}}();var c,s=[],l=!1,a=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):a=-1,s.length&&h())}function h(){if(!l){var t=i(f);l=!0;for(var e=s.length;e;){for(c=s,s=[];++a<e;)c&&c[a].run();a=-1,e=s.length}c=null,l=!1,u(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new m(t,e)),1!==s.length||l||i(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0};
},{}],"BGHZ":[function(require,module,exports) {
var process = require("process");
var e,t=require("process");Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e[e.Trace=0]="Trace",e[e.Debug=1]="Debug",e[e.Info=2]="Info",e[e.Warning=3]="Warning",e[e.Error=4]="Error"}(e=exports.Level||(exports.Level={}));class s{constructor(e,t){this.identifier=e,this.value=t}toJSON(){return{identifier:this.identifier,value:this.value}}}exports.Field=s;class r{constructor(e,t){this.expected=e,this.ms=t}}exports.Time=r,exports.time=(e=>new r(e,Date.now())),exports.field=((e,t)=>new s(e,t));class o{constructor(e="%s",t=!0){this.formatType=e,this.colors=t,this.format="",this.args=[],this.fields=[],this.minimumTagWidth=5}tag(e,t){for(let s=e.length;s<this.minimumTagWidth;++s)e+=" ";this.push(e+" ",t)}push(e,t,r){Array.isArray(e)&&e.every(e=>e instanceof s)?this.fields.push(...e):this.colors?(this.format+=`${this.formatType}${this.getType(e)}${this.formatType}`,this.args.push(this.style(t,r),e,this.reset())):(this.format+=`${this.getType(e)}`,this.args.push(e))}write(){this.doWrite(...this.flush())}flush(){const e=[this.format,this.args,this.fields];return this.format="",this.args=[],this.fields=[],e}getType(e){switch(typeof e){case"object":return"%o";case"number":return"%d";default:return"%s"}}}exports.Formatter=o;class i extends o{constructor(){super("%c")}style(e,t){return(e?`color: ${e};`:"")+(t?`font-weight: ${t};`:"")}reset(){return this.style("inherit","normal")}doWrite(e,t,s){console.groupCollapsed(e,...t),s.forEach(e=>{this.push(e.identifier,"#3794ff","bold"),void 0!==e.value&&e.value.constructor&&e.value.constructor.name&&this.push(` (${e.value.constructor.name})`),this.push(": "),this.push(e.value);const t=this.flush();console.log(t[0],...t[1])}),console.groupEnd()}}exports.BrowserFormatter=i;class h extends o{constructor(){super("%s",!!t.stdout.isTTY)}style(e,t){return("bold"===t?"[1m":"")+(e?this.hex(e):"")}reset(){return"[0m"}hex(e){const[t,s,r]=this.hexToRgb(e);return`[38;2;${t};${s};${r}m`}hexToRgb(e){const t=parseInt(e.substr(1),16);return[t>>16&255,t>>8&255,255&t]}doWrite(e,t,s){if(0===s.length)return console.log(e,...t);const r={};s.forEach(e=>r[e.identifier]=e.value),console.log(e+" %s%s%s",...t,this.style("#8c8c8c"),JSON.stringify(r),this.reset())}}exports.ServerFormatter=h;class n{constructor(s,r,o,i=[]){this._formatter=s,this.name=r,this.defaultFields=o,this.extenders=i,this.level=e.Info,this.muted=!1,r&&(this.nameColor=this.hashStringToColor(r)),void 0!==t&&t.env}set formatter(e){this._formatter=e}mute(){this.muted=!0}extend(e){this.extenders.push(e)}info(t,...s){this.handle({type:"info",message:t,fields:s,tagColor:"#008FBF",level:e.Info})}warn(t,...s){this.handle({type:"warn",message:t,fields:s,tagColor:"#FF9D00",level:e.Warning})}trace(t,...s){this.handle({type:"trace",message:t,fields:s,tagColor:"#888888",level:e.Trace})}debug(t,...s){this.handle({type:"debug",message:t,fields:s,tagColor:"#84009E",level:e.Debug})}error(t,...s){this.handle({type:"error",message:t,fields:s,tagColor:"#B00000",level:e.Error})}named(e,...t){const s=new n(this._formatter,e,t,this.extenders);return this.muted&&s.mute(),s}handle(e){if(this.level>e.level||this.muted)return;let t=e.fields||[];if("function"==typeof e.message){const s=e.message();e.message=s.shift(),t=s}const s=this.defaultFields?t.filter(e=>!!e).concat(this.defaultFields):t.filter(e=>!!e),o=Date.now();let i=[];s&&s.length>0&&(i=s.filter(e=>e.value instanceof r),this._formatter.push(s)),this._formatter.tag(e.type,e.tagColor),this.name&&this.nameColor&&this._formatter.tag(this.name,this.nameColor),this._formatter.push(e.message),i.length>0&&i.forEach(e=>{const t=o-e.value.ms,s=t/e.value.expected,r=125*(1-s),i=125+r,h=s<1?i:r,n=s>=1?i:r;this._formatter.push(` ${e.identifier}=`,"#3794ff"),this._formatter.push(`${t}ms`,this.rgbToHex(n>0?n:0,h>0?h:0,0))}),this._formatter.write(),this.extenders.forEach(t=>{t({section:this.name,fields:e.fields,level:e.level,message:e.message,type:e.type})})}djb2(e){let t=5381;for(let s=0;s<e.length;s++)t=(t<<5)+t+e.charCodeAt(s);return t}rgbToHex(e,t,s){const r=(((255&Math.round(e))<<16)+((255&Math.round(t))<<8)+(255&Math.round(s))).toString(16);return"#"+"000000".substring(r.length)+r}hashStringToColor(e){const t=this.djb2(e);return this.rgbToHex((16711680&t)>>16,(65280&t)>>8,255&t)}}exports.Logger=n,exports.logger=new n(void 0===t||void 0===t.stdout?new i:new h);
},{"process":"i8TM"}],"PYIK":[function(require,module,exports) {
"use strict";function e(e){for(var r in e)exports.hasOwnProperty(r)||(exports[r]=e[r])}Object.defineProperty(exports,"__esModule",{value:!0}),e(require("./logger"));
},{"./logger":"BGHZ"}],"TCzD":[function(require,module,exports) {
"use strict";var e=this&&this.__assign||function(){return(e=Object.assign||function(e){for(var r,t=1,o=arguments.length;t<o;t++)for(var n in r=arguments[t])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("@coder/logger");exports.split=function(e,r){var t=e.indexOf(r);return-1!==t?[e.substring(0,t).trim(),e.substring(t+1)]:[e,""]},exports.plural=function(e){return 1===e?"":"s"},exports.generateUuid=function(e){void 0===e&&(e=24);var r="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";return Array(e).fill(1).map(function(){return r[Math.floor(Math.random()*r.length)]}).join("")},exports.normalize=function(e,r){return void 0===r&&(r=!1),e.replace(/\/\/+/g,"/").replace(/\/+$/,r?"/":"")},exports.getOptions=function(){var t;try{var o=document.getElementById("coder-options");if(!o)throw new Error("no options element");var n=o.getAttribute("data-settings");if(!n)throw new Error("no options value");t=JSON.parse(n)}catch(l){t={}}var a=new URLSearchParams(location.search).get("options");if(a&&(t=e(e({},t),JSON.parse(a))),void 0!==t.logLevel&&(r.logger.level=t.logLevel),t.base){var i=location.pathname.replace(/^\//g,"").split("/");i[i.length-1]=t.base;var s=new URL(location.origin+"/"+i.join("/"));t.base=exports.normalize(s.pathname,!0)}return r.logger.debug("got options",r.field("options",t)),t};
},{"@coder/logger":"PYIK"}],"O6cr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../common/util"),r=e.getOptions();if("serviceWorker"in navigator){var i=e.normalize(r.base+"/static/"+r.commit+"/dist/serviceWorker.js");navigator.serviceWorker.register(i,{scope:r.base||"/"}).then(function(){console.log("[Service Worker] registered")})}
},{"../common/util":"TCzD"}]},{},["O6cr"], null)
//# sourceMappingURL=/static/fd36a99a4c78669970ebc4eb05768293b657716f/dist/register.js.map