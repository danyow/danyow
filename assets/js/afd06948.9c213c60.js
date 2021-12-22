"use strict";(self.webpackChunkdanyow=self.webpackChunkdanyow||[]).push([[3153],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=u(n),d=o,f=s["".concat(c,".").concat(d)]||s[d]||m[d]||a;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=s;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var u=2;u<a;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},9:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return u},assets:function(){return p},toc:function(){return m},default:function(){return d}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={layout:"post",title:"vscode\u63d2\u4ef6\u5f00\u53d1",categories:"Mac \u7b14\u8bb0 vscode",comments:!0,date:"2019-08-22 22:35:39 +0800",published:!0},c=void 0,u={permalink:"/blog/2019/vscode/plugin",editUrl:"https://github.com/danyow/danyow/edit/main/blog/blog/2019/vscode/plugin.md",source:"@site/blog/2019/vscode/plugin.md",title:"vscode\u63d2\u4ef6\u5f00\u53d1",description:"Title:\u76ee\u7684\u662f\u4e3a\u4e86\u5c06\u526a\u5207\u677f\u91cc\u9762\u7684\u56fe\u7247\u4e00\u952ebase64\u5230markdown\u5f53\u4e2d, \u7701\u53bb\u5efa\u7acb\u56fe\u5e8a\u7684\u6b65\u9aa4. \u5f53\u7136\u540e\u7eed\u662f\u6709\u53ef\u80fd\u642d\u5efa\u56fe\u5e8a\u53bb\u4fdd\u5b58\u56fe\u7247.",date:"2019-08-22T14:35:39.000Z",formattedDate:"2019\u5e748\u670822\u65e5",tags:[],readingTime:.495,truncated:!1,authors:[],prevItem:{title:"ruby\u5728mac\u4e0a\u7684\u5347\u7ea7",permalink:"/blog/2019/ruby"},nextItem:{title:"zsh\u7684\u4f7f\u7528",permalink:"/blog/2019/zsh"}},p={authorsImageUrls:[]},m=[{value:"\u524d\u671f\u51c6\u5907",id:"\u524d\u671f\u51c6\u5907",children:[],level:2},{value:"\u751f\u6210\u5de5\u7a0b",id:"\u751f\u6210\u5de5\u7a0b",children:[],level:2}],s={toc:m};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Title:\u76ee\u7684\u662f\u4e3a\u4e86\u5c06\u526a\u5207\u677f\u91cc\u9762\u7684\u56fe\u7247\u4e00\u952ebase64\u5230markdown\u5f53\u4e2d, \u7701\u53bb\u5efa\u7acb\u56fe\u5e8a\u7684\u6b65\u9aa4. \u5f53\u7136\u540e\u7eed\u662f\u6709\u53ef\u80fd\u642d\u5efa\u56fe\u5e8a\u53bb\u4fdd\u5b58\u56fe\u7247."),(0,a.kt)("h2",{id:"\u524d\u671f\u51c6\u5907"},"\u524d\u671f\u51c6\u5907"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u9700\u8981\u5b89\u88c5 ",(0,a.kt)("em",{parentName:"li"},"node.js")," ",(0,a.kt)("inlineCode",{parentName:"li"},"brew install node")),(0,a.kt)("li",{parentName:"ul"},"\u5229\u7528 ",(0,a.kt)("em",{parentName:"li"},"npm")," \u5b89\u88c5 \u53e6\u5916\u4e24\u4e2a\u5de5\u5177 ",(0,a.kt)("em",{parentName:"li"},"Yeoman")," \u548c ",(0,a.kt)("em",{parentName:"li"},"VS Code Extension generator")," . \u7c7b\u4f3c\u4e8e\u811a\u624b\u67b6 ",(0,a.kt)("inlineCode",{parentName:"li"},"npm install -g yo generator-code"))),(0,a.kt)("h2",{id:"\u751f\u6210\u5de5\u7a0b"},"\u751f\u6210\u5de5\u7a0b"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"yo code")," \u5373\u53ef"))}d.isMDXComponent=!0}}]);