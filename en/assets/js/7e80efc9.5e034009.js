"use strict";(self.webpackChunkdanyow=self.webpackChunkdanyow||[]).push([[3946],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return f}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),i=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):u(u({},t),e)),r},p=function(e){var t=i(e.components);return n.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),y=i(r),f=o,s=y["".concat(l,".").concat(f)]||y[f]||m[f]||a;return r?n.createElement(s,u(u({ref:t},p),{},{components:r})):n.createElement(s,u({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,u=new Array(a);u[0]=y;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,u[1]=c;for(var i=2;i<a;i++)u[i]=r[i];return n.createElement.apply(null,u)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},461:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return i},assets:function(){return p},toc:function(){return m},default:function(){return f}});var n=r(7462),o=r(3366),a=(r(7294),r(3905)),u=["components"],c={layout:"post",title:"ruby\u5728mac\u4e0a\u7684\u5347\u7ea7",categories:"Mac \u7b14\u8bb0 ruby",comments:!0,date:"2019-09-07 00:40:54 +0800",published:!0},l=void 0,i={permalink:"/en/blog/2019/ruby",editUrl:"https://github.com/danyow/danyow/edit/main/blog/blog/2019/ruby.md",source:"@site/blog/2019/ruby.md",title:"ruby\u5728mac\u4e0a\u7684\u5347\u7ea7",description:"Title: mac\u81ea\u5e26\u7684ruby\u7248\u672c\u8fc7\u4f4e",date:"2019-09-06T16:40:54.000Z",formattedDate:"September 6, 2019",tags:[],readingTime:.25,truncated:!1,authors:[],prevItem:{title:"mac\u4e0a\u542f\u52a8\u6587\u4ef6\u670d\u52a1\u5668",permalink:"/en/blog/2019/mac"},nextItem:{title:"vscode\u63d2\u4ef6\u5f00\u53d1",permalink:"/en/blog/2019/vscode/plugin"}},p={authorsImageUrls:[]},m=[{value:"\u5b89\u88c5<em>rvm</em>\u73af\u5883\u6765\u5b89\u88c5<em>ruby</em>\u73af\u5883",id:"\u5b89\u88c5rvm\u73af\u5883\u6765\u5b89\u88c5ruby\u73af\u5883",children:[],level:2},{value:"\u67e5\u770b\u5f53\u524d\u7248\u672c",id:"\u67e5\u770b\u5f53\u524d\u7248\u672c",children:[],level:2},{value:"\u5b89\u88c5\u6307\u5b9a<em>ruby</em>\u7248\u672c",id:"\u5b89\u88c5\u6307\u5b9aruby\u7248\u672c",children:[],level:2}],y={toc:m};function f(e){var t=e.components,r=(0,o.Z)(e,u);return(0,a.kt)("wrapper",(0,n.Z)({},y,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Title: ",(0,a.kt)("em",{parentName:"p"},"mac"),"\u81ea\u5e26\u7684",(0,a.kt)("em",{parentName:"p"},"ruby"),"\u7248\u672c\u8fc7\u4f4e"),(0,a.kt)("h2",{id:"\u5b89\u88c5rvm\u73af\u5883\u6765\u5b89\u88c5ruby\u73af\u5883"},"\u5b89\u88c5",(0,a.kt)("em",{parentName:"h2"},"rvm"),"\u73af\u5883\u6765\u5b89\u88c5",(0,a.kt)("em",{parentName:"h2"},"ruby"),"\u73af\u5883"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"`curl -L https://get.rvm.io | bash -s stable`\n")),(0,a.kt)("h2",{id:"\u67e5\u770b\u5f53\u524d\u7248\u672c"},"\u67e5\u770b\u5f53\u524d\u7248\u672c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"`rvm list known`\n")),(0,a.kt)("h2",{id:"\u5b89\u88c5\u6307\u5b9aruby\u7248\u672c"},"\u5b89\u88c5\u6307\u5b9a",(0,a.kt)("em",{parentName:"h2"},"ruby"),"\u7248\u672c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"`rvm install 2.6.3`\n")),(0,a.kt)("p",null,"done!"))}f.isMDXComponent=!0}}]);