"use strict";(self.webpackChunkdanyow=self.webpackChunkdanyow||[]).push([[4240],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return s}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),f=c(n),s=o,y=f["".concat(p,".").concat(s)]||f[s]||m[s]||a;return n?r.createElement(y,i(i({ref:t},u),{},{components:n})):r.createElement(y,i({ref:t},u))}));function s(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},4279:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return c},assets:function(){return u},toc:function(){return m},default:function(){return s}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={layout:"post",title:"Python\u9ad8\u624b\u4e4b\u8def",categories:"\u7b14\u8bb0 python",comments:!0,date:"2019-06-09 11:28:32 +0800",published:!0},p=void 0,c={permalink:"/en/blog/2019/python/inspect",editUrl:"https://github.com/danyow/danyow/edit/main/blog/blog/2019/python/inspect.md",source:"@site/blog/2019/python/inspect.md",title:"Python\u9ad8\u624b\u4e4b\u8def",description:"Title: \u7b2c\u4e09\u7248",date:"2019-06-09T03:28:32.000Z",formattedDate:"June 9, 2019",tags:[],readingTime:.34,truncated:!1,authors:[],prevItem:{title:"\u65c5\u884c\u8005\u4e00\u53f7",permalink:"/en/blog/2019/voyager"},nextItem:{title:"\u5bf9\u5bf9\u5b50",permalink:"/en/blog/2019/poetry"}},u={authorsImageUrls:[]},m=[],f={toc:m};function s(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Title: \u7b2c\u4e09\u7248"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"10.1 \u751f\u6210\u5668")),(0,a.kt)("p",null,"\u67e5\u770b\u4e00\u4e2a\u51fd\u6570\u662f\u5426\u662f\u751f\u6210\u5668 ",(0,a.kt)("inlineCode",{parentName:"p"},"isgeneratorfunction()")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"import inspect\n\ninspect.isgeneratorfunction(foo)\n")),(0,a.kt)("p",null,"\u83b7\u53d6\u751f\u6210\u5668\u7684\u5f53\u524d\u72b6\u6001 ",(0,a.kt)("inlineCode",{parentName:"p"},"getgeneratorstate()")),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"GEN_CREATED"),"    \u7b49\u5f85\u88ab\u7b2c\u4e00\u6b21\u6267\u884c"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"GEN_RUNNING"),"    \u6b63\u5728\u88ab\u6267\u884c"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"GEN_SUSPENDED"),"  \u7b49\u5f85\u88ab ",(0,a.kt)("inlineCode",{parentName:"li"},"next()")," \u8c03\u7528"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"GEN_CLOSED"),"     \u7ed3\u675f\u8fd0\u884c")))}s.isMDXComponent=!0}}]);