var EvtScan=function(){"use strict";var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)};function t(t,e){function i(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}var s=function(){return(s=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)};function a(s,a,o,u){return new(o=o||Promise)(function(t,e){function i(t){try{n(u.next(t))}catch(t){e(t)}}function r(t){try{n(u.throw(t))}catch(t){e(t)}}function n(e){e.done?t(e.value):new o(function(t){t(e.value)}).then(i,r)}n((u=u.apply(s,a||[])).next())})}function o(i,r){var n,s,a,t,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return t={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,s&&(a=2&e[0]?s.return:e[0]?s.throw||((a=s.return)&&a.call(s),0):s.next)&&!(a=a.call(s,e[1])).done)return a;switch(s=0,a&&(e=[2&e[0],a.value]),e[0]){case 0:case 1:a=e;break;case 4:return o.label++,{value:e[1],done:!1};case 5:o.label++,s=e[1],e=[0];continue;case 7:e=o.ops.pop(),o.trys.pop();continue;default:if(!(a=0<(a=o.trys).length&&a[a.length-1])&&(6===e[0]||2===e[0])){o=0;continue}if(3===e[0]&&(!a||e[1]>a[0]&&e[1]<a[3])){o.label=e[1];break}if(6===e[0]&&o.label<a[1]){o.label=a[1],a=e;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(e);break}a[2]&&o.ops.pop(),o.trys.pop();continue}e=r.call(i,o)}catch(t){e=[6,t],s=0}finally{n=a=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}}var n=(u.prototype.queryParams=function(e){if(!e)return"";var t=Object.keys(e).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])}).join("&");return t?"?"+t:""},u.prototype.get=function(i,r,n){return void 0===r&&(r={}),void 0===n&&(n={}),a(this,void 0,void 0,function(){var e;return o(this,function(t){switch(t.label){case 0:if(!(e=u.Config.fetch||"undefined"!=typeof window&&window.fetch))throw Error("Your device does not support fetch function.");return[4,e(this.entrypoint+i+this.queryParams(r),{method:"GET",mode:"cors",cache:"no-cache",headers:s({"User-Agent":"EvtScanSDK v1.0"},n),redirect:"follow",referrer:"no-referrer"})];case 1:return[4,t.sent().json()];case 2:return[2,t.sent()]}})})},u.prototype.request=function(i,r,n){return void 0===r&&(r={}),void 0===n&&(n=""),a(this,void 0,void 0,function(){var e;return o(this,function(t){switch(t.label){case 0:return-1!==i.indexOf("%%")&&n&&(i=i.replace("%%",n)),[4,this.get(i,r)];case 1:return(e=t.sent()).data&&(e.state||e.status)?[2,e.data]:[2,e]}})})},u.Config={fetch:null},u);function u(t,e){this.entrypoint="https://evtscan.io/api",this.timeout=3e3,t&&(this.entrypoint=t),e&&(this.timeout=e)}var h=(e.prototype.getPageData=function(){return a(this,void 0,void 0,function(){var e,i,r,n=this;return o(this,function(t){switch(t.label){case 0:return this.pageData[this.pageOffset]?[2,this.pageData[this.pageOffset]]:(e=this.pageData,i=this.pageOffset,[4,(r=this).apiCaller.request(this.uri,s({},this.config,{page:this.pageOffset,size:this.pageSize}),this.key||"")]);case 1:return e[i]=r.data=t.sent(),this.formatter&&(this.data.length&&this.data.forEach?this.data.forEach(function(t,e){n.data[e]=n.formatter(n,t)}):this.pageData[this.pageOffset]=this.data=this.formatter(this,this.data)),[2,this.data]}})})},e.prototype.prev=function(){return a(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return[4,this.page(this.pageOffset-1)];case 1:return[2,t.sent()]}})})},e.prototype.next=function(){return a(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return[4,this.page(this.pageOffset+1)];case 1:return[2,t.sent()]}})})},e.prototype.page=function(e){return a(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return(e<0||parseInt(""+e,10)!==e)&&(e=this.pageOffset),this.pageOffset=e,[4,this.getPageData()];case 1:return[2,t.sent()]}})})},e);function e(t,e,i,r){this.pageSize=20,this.pageOffset=-1,this.pageData=[],this.uri=t,i&&(this.key=i),this.apiCaller=r||new n,e&&(e.page&&(this.pageOffset=e.page-1),e.size&&(this.pageSize=e.size),e.formatter&&(this.formatter=e.formatter),this.config=e)}var i={apiCaller:null},c=(p.prototype.init=function(){},p.prototype.update=function(){return a(this,void 0,void 0,function(){return o(this,function(t){return[2]})})},p);function p(t,e){this._raw=t,this.apiCaller=e||i.apiCaller,this.init()}var l,d=(t(f,l=c),f.prototype.init=function(){this.address=this._raw.address},f.prototype.update=function(){return a(this,void 0,void 0,function(){var e,i;return o(this,function(t){switch(t.label){case 0:return[4,(e=this).apiCaller.request(I.R.Detail.Address,null,this.address)];case 1:return e.stats=t.sent(),[4,(i=this).apiCaller.request(I.R.Detail.AddressAssets,null,this.address)];case 2:return i.assets=t.sent(),this.history=new h(I.R.Detail.AddressHistory,{},this.address,this.apiCaller),[2]}})})},f);function f(){var t=null!==l&&l.apply(this,arguments)||this;return t.stats={},t.assets=[],t.history=null,t}var y,w=(t(v,y=c),v.prototype.init=function(){this.id=this._raw.block_id,this.num=this._raw.block_num,this.root=this._raw.trx_merkle_root,this.trxCount=this._raw.trx_count,this.producer=this._raw.producer,this.pending=this._raw.pending,this.timestamp=new Date(this._raw.timestamp),this.created=new Date(this._raw.created_at),this.prevId=this._raw.prev_block_id},v.prototype.prev=function(){return a(this,void 0,void 0,function(){var e,i;return o(this,function(t){switch(t.label){case 0:return i=v.bind,[4,(e=this).apiCaller.request(I.R.Detail.Block,null,this.prevId)];case 1:return[2,e._prev=new(i.apply(v,[void 0,t.sent()]))]}})})},v);function v(){return null!==y&&y.apply(this,arguments)||this}var b,g=(t(_,b=c),_.prototype.init=function(){this.id=this._raw.trx_id,this.sequenceNum=this._raw.seq_num,this.blockNum=this._raw.block_num,this.actionCount=this._raw.action_count,this.maxCharge=this._raw.max_charge,this.pending=this._raw.pending,this.type=this._raw.type,this.status=this._raw.status,this.signatures=this._raw.signatures||[],this.keys=this._raw.keys.map(function(t){return{address:t}}),this.elapsed=this._raw.elapsed,this.charge=this._raw.charge,this.suspend=this._raw.suspend_name,this.timestamp=new Date(this._raw.timestamp),this.created=new Date(this._raw.created_at),this.expiration=new Date(this._raw.expiration),this.blockId=this._raw.block_id,this.payer={address:this._raw.pager}},_.prototype.getPayer=function(){return a(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return this._payer=new d(this.payer,this.apiCaller),[4,this._payer.update()];case 1:return t.sent(),[2,this._payer]}})})},_.prototype.getBlock=function(){return a(this,void 0,void 0,function(){var e,i;return o(this,function(t){switch(t.label){case 0:return i=w.bind,[4,(e=this).apiCaller.request(I.R.Detail.Block,null,this.blockId)];case 1:return[2,e._block=new(i.apply(w,[void 0,t.sent()]))]}})})},_);function _(){return null!==b&&b.apply(this,arguments)||this}var m,k=(t(C,m=g),C);function C(){return null!==m&&m.apply(this,arguments)||this}var D,O=(t(R,D=g),R);function R(){return null!==D&&D.apply(this,arguments)||this}var q,x=(t(A,q=c),A.prototype.init=function(){this.name=this._raw.name,this.symName=this._raw.sym_name,this.symId=this._raw.sym_id,this.precision=parseInt(this._raw.sym.split(",")[0],10)||5,this.total=this._raw.total_supply,this.current=void 0===this._raw.current_supply?-1:this._raw.current_supply,this.metas=this._raw.metas,this.issue=this._raw.issue,this.transfer=this._raw.transfer,this.manage=this._raw.manage,this.timestamp=new Date(this._raw.timestamp),this.created=new Date(this._raw.created_at),this.creator={address:this._raw.pager},this.trxId=this._raw.trx_id},Object.defineProperty(A.prototype,"sym",{get:function(){return this.precision+",S#"+this.symId},enumerable:!0,configurable:!0}),A.prototype.getTransaction=function(){return a(this,void 0,void 0,function(){var e,i;return o(this,function(t){switch(t.label){case 0:return i=g.bind,[4,(e=this).apiCaller.request(I.R.Detail.Block,null,this.trxId)];case 1:return[2,e._trx=new(i.apply(g,[void 0,t.sent()]))]}})})},A.prototype.getCreator=function(){return a(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return this._creator=new d(this.creator,this.apiCaller),[4,this._creator.update()];case 1:return t.sent(),[2,this._creator]}})})},A);function A(){return null!==q&&q.apply(this,arguments)||this}var E=Object.freeze({EvtAddress:d,Block:w,Transaction:g,Everipay:k,Everipass:O,Fungible:x}),I=(Object.defineProperty(P.prototype,"request",{get:function(){return this.apiCaller?this.apiCaller.request:void 0},enumerable:!0,configurable:!0}),P.prototype.buildRequest=function(r,t){var e=P.R.Recent,i=(P.R.Detail,e[r]);if(!i)throw Error("The API Entrypoint is not recognized.");if(!t||"object"==typeof t)return new h(i,s({},t,{formatter:function(t,e){var i=E[r];return i?new i(e,t.apiCaller):e}}),null,this.apiCaller)},P.prototype.searchAddress=function(t){var i=this;return new h(P.R.General.Address,{keyword:t,formatter:function(t,e){return i.address({address:e})}},null,this.apiCaller)},P.prototype.address=function(t){return new d(t,this.apiCaller)},P.R={General:{System:"/",SysInfo:"/info",ChainInfo:"/chaininfo",Address:"/searchAddress"},Recent:{Block:"/block",Transaction:"/transaction",Everipay:"/everipay",Everipass:"/everipass",Action:"/action",Fungible:"/fungible",Domain:"/domain",Group:"/group",Nonfungible:"/nonfungible"},Detail:{Block:"/block/%%",Transaction:"/transaction/%%",Fungible:"/fungible/%%",Domain:"/domain/%%",Group:"/group/%%",Nonfungible:"/nonfungible/%%",Address:"/address/%%",AddressAssets:"/addressAssets/%%",AddressHistory:"/addressHistory/%%"}},P);function P(t,e){this.entrypoint="https://evtscan.io/api",this.timeout=3e3,this.debug=!1,this.block=this.buildRequest.bind(this,"Block"),this.transaction=this.buildRequest.bind(this,"Transaction"),this.fungible=this.buildRequest.bind(this,"Fungible"),this.group=this.buildRequest.bind(this,"Group"),this.domain=this.buildRequest.bind(this,"Domain"),this.nonfungible=this.buildRequest.bind(this,"Nonfungible"),this.everipay=this.buildRequest.bind(this,"Everipay"),this.everipass=this.buildRequest.bind(this,"Everipass"),t.entrypoint&&(this.entrypoint=t.entrypoint),t.timeout&&(this.timeout=t.timeout),t.debug&&(this.debug=t.debug),e&&(this.defaultParams=e),this.apiCaller=i.apiCaller=new n(this.entrypoint,this.timeout)}return{new:function(t){return new I(t||{})},EvtScan:I,ApiCaller:n}}();
//# sourceMappingURL=evtscan.js.map
