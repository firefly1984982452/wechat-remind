(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0455":function(e,t,n){},"4ec8":function(e,t,n){"use strict";n.r(t);var o=n("a70e"),i=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=i.a},5190:function(e,t,n){"use strict";(function(e){n("2c1a");o(n("66fd"));var t=o(n("fb4a"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},a70e:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("4795"));function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,o,i,c,s){try{var a=e[c](s),r=a.value}catch(u){return void n(u)}a.done?t(r):Promise.resolve(r).then(o,i)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(o,i){var s=e.apply(t,n);function a(e){c(s,o,i,a,r,"next",e)}function r(e){c(s,o,i,a,r,"throw",e)}a(void 0)}))}}var a={data:function(){return{remindList:[],content:"",time:"",remindKey:"remindKey",openID:"",userCode:"",token:""}},onLoad:function(){this.init(),this.login()},methods:{login:function(){var t=this;e.login({provider:"weixin",success:function(e){console.log(e.code),t.userCode=e.code,t.getOpenid()}})},getOpenid:function(){var t=this;return s(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i={appid:"wx8bda0c57123111e7",secret:"ccc431411276f087b41f680275e457a8",js_code:t.userCode,grant_type:"authorization_code"},n.next=3,e.request({url:"https://api.weixin.qq.com/sns/jscode2session",data:i,success:function(e){console.log(e.data),t.openID=e.data.openid,console.log("openID:"+t.openID),t.getToken()}});case 3:case"end":return n.stop()}}),n)})))()},getToken:function(){var t=this;return s(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i={appid:"wx8bda0c57123111e7",secret:"ccc431411276f087b41f680275e457a8",grant_type:"client_credential"},n.next=3,e.request({url:"https://api.weixin.qq.com/cgi-bin/token",data:i,success:function(e){t.token=e.data.access_token}});case 3:case"end":return n.stop()}}),n)})))()},init:function(){var t=this;e.getStorage({key:this.remindKey,success:function(e){console.log(e.data),t.remindList=e.data},fail:function(){e.setStorage({key:t.remindKey,data:[],success:function(e){console.log("初始化存储数据成功")},fail:function(){e.showModal({title:"初始化存储数据失败!",showCancel:!1})}})}})},change:function(e){this.time=e},requestSubscribeMessage:function(){wx.requestSubscribeMessage({tmplIds:["yKXlE3VZ3d02VnvecwikrZedfVX3zpkFWuoeZRZ8r-o"],success:function(t){console.log(t),e.showModal({title:"授权成功!",showCancel:!1})},fail:function(t){console.log(t),e.showModal({title:"授权失败!",showCancel:!1})}})},save:function(){var t=this,n={content:this.content,time:this.time};this.remindList.push(n),e.setStorage({key:this.remindKey,data:this.remindList,success:function(n){e.showToast({title:"添加提醒成功",duration:1e3}),t.content="",t.time=""},fail:function(t){e.showToast({title:"保存本地失败"+t,duration:1e3})}})},send:function(){var t=this,n={touser:this.openID,template_id:"yKXlE3VZ3d02VnvecwikrZedfVX3zpkFWuoeZRZ8r-o",data:{thing8:{value:this.content},time13:{value:this.time}},page:"index"};e.request({url:"https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token="+this.token,data:JSON.stringify(n),method:"POST",success:function(n){console.log(n.data.errcode),0==n.data.errcode?t.save():e.showModal({title:"添加提醒失败，请授权!",showCancel:!1})},fail:function(t){e.showModal({title:"添加提醒失败，"+JSON.parse(t),showCancel:!1})}})},del:function(t,n){var o=this;e.showModal({title:"提示",content:"是否删除",success:function(t){t.confirm?(o.remindList.splice(n,1),e.setStorage({key:o.remindKey,data:o.remindList,success:function(t){e.showToast({title:"删除成功",duration:1e3})},fail:function(){e.showModal({title:"删除失败!",showCancel:!1})}})):t.cancel&&console.log("用户点击取消")}})}}};t.default=a}).call(this,n("543d")["default"])},be5f:function(e,t,n){"use strict";var o=n("0455"),i=n.n(o);i.a},ed77:function(e,t,n){"use strict";var o={ePicker:function(){return Promise.all([n.e("common/vendor"),n.e("components/e-picker/e-picker")]).then(n.bind(null,"4129"))}},i=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return o}))},fb4a:function(e,t,n){"use strict";n.r(t);var o=n("ed77"),i=n("4ec8");for(var c in i)"default"!==c&&function(e){n.d(t,e,(function(){return i[e]}))}(c);n("be5f");var s,a=n("f0c5"),r=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);t["default"]=r.exports}},[["5190","common/runtime","common/vendor"]]]);