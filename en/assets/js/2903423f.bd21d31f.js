"use strict";(self.webpackChunkdanyow=self.webpackChunkdanyow||[]).push([[5004],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return y}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),u=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=u(e.components);return r.createElement(p.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=u(t),y=a,f=d["".concat(p,".").concat(y)]||d[y]||m[y]||l;return t?r.createElement(f,o(o({ref:n},c),{},{components:t})):r.createElement(f,o({ref:n},c))}));function y(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,o=new Array(l);o[0]=d;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var u=2;u<l;u++)o[u]=t[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},6482:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return i},contentTitle:function(){return p},metadata:function(){return u},assets:function(){return c},toc:function(){return m},default:function(){return y}});var r=t(7462),a=t(3366),l=(t(7294),t(3905)),o=["components"],i={layout:"post",title:"Python\u7a0b\u5e8f\u8bbe\u8ba1\u57fa\u7840",categories:"\u7b14\u8bb0 python",comments:!0,date:"2019-05-27 21:06:13 +0800"},p=void 0,u={permalink:"/en/blog/2019/python/fundamentals",editUrl:"https://github.com/danyow/danyow/edit/main/blog/blog/2019/python/fundamentals.md",source:"@site/blog/2019/python/fundamentals.md",title:"Python\u7a0b\u5e8f\u8bbe\u8ba1\u57fa\u7840",description:"Title: \u4e0a\u6d77\u5e02\u9ad8\u7b49\u5b66\u6821\u8ba1\u7b97\u673a\u7b49\u7ea7\u8003\u8bd5\uff08\u4e8c\u7ea7\uff09\u63a8\u8350\u6559\u6750",date:"2019-05-27T13:06:13.000Z",formattedDate:"May 27, 2019",tags:[],readingTime:1.495,truncated:!1,authors:[],prevItem:{title:"Python3\u9762\u5411\u5bf9\u8c61\u7f16\u7a0b",permalink:"/en/blog/2019/python/object"},nextItem:{title:"Hello World!",permalink:"/en/blog/2019/jekyll"}},c={authorsImageUrls:[]},m=[{value:"2. Python\u7a0b\u5e8f\u7684\u57fa\u672c\u8bed\u6cd5",id:"2-python\u7a0b\u5e8f\u7684\u57fa\u672c\u8bed\u6cd5",children:[],level:2},{value:"3. Python \u7a0b\u5e8f\u7684\u57fa\u672c\u6d41\u7a0b\u63a7\u5236",id:"3-python-\u7a0b\u5e8f\u7684\u57fa\u672c\u6d41\u7a0b\u63a7\u5236",children:[],level:2},{value:"4. Python\u7684\u7279\u5f81\u6570\u636e\u7c7b\u578b",id:"4-python\u7684\u7279\u5f81\u6570\u636e\u7c7b\u578b",children:[],level:2},{value:"5. \u6587\u4ef6",id:"5-\u6587\u4ef6",children:[],level:2},{value:"7. \u9762\u5411\u5bf9\u8c61\u7684\u7a0b\u5e8f\u8bbe\u8ba1",id:"7-\u9762\u5411\u5bf9\u8c61\u7684\u7a0b\u5e8f\u8bbe\u8ba1",children:[],level:2}],d={toc:m};function y(e){var n=e.components,t=(0,a.Z)(e,o);return(0,l.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Title: \u4e0a\u6d77\u5e02\u9ad8\u7b49\u5b66\u6821\u8ba1\u7b97\u673a\u7b49\u7ea7\u8003\u8bd5\uff08\u4e8c\u7ea7\uff09\u63a8\u8350\u6559\u6750"),(0,l.kt)("h2",{id:"2-python\u7a0b\u5e8f\u7684\u57fa\u672c\u8bed\u6cd5"},"2. Python\u7a0b\u5e8f\u7684\u57fa\u672c\u8bed\u6cd5"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u56db\u820d\u516d\u5165\u4e94\u7559\u53cc ",(0,l.kt)("inlineCode",{parentName:"li"},"round()"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-python"},"round(1.5)\nround(2.5)\n'''\n2\n2\n'''\n")),(0,l.kt)("h2",{id:"3-python-\u7a0b\u5e8f\u7684\u57fa\u672c\u6d41\u7a0b\u63a7\u5236"},"3. Python \u7a0b\u5e8f\u7684\u57fa\u672c\u6d41\u7a0b\u63a7\u5236"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5141\u8bb8 ",(0,l.kt)("inlineCode",{parentName:"p"},"x > y > z")," ",(0,l.kt)("inlineCode",{parentName:"p"},"x < y > z"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"while")," \u548c ",(0,l.kt)("inlineCode",{parentName:"p"},"else")," \u53ef\u4ee5\u4e00\u8d77\u7528 \u5728\u9000\u51fa\u5faa\u73af\u7684\u65f6\u5019\u8c03\u7528"))),(0,l.kt)("h2",{id:"4-python\u7684\u7279\u5f81\u6570\u636e\u7c7b\u578b"},"4. Python\u7684\u7279\u5f81\u6570\u636e\u7c7b\u578b"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5217\u8868\u548c\u5b57\u5178\u7684 ",(0,l.kt)("inlineCode",{parentName:"li"},"clear()")," \u65b9\u6cd5")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-py"},"a = b = [1, 2, 3]\nprint(a, b)\na.clear()\nprint(a, b)\n\nc = d = {'x':1, 'y':2}\nprint(c, d)\nc.clear()\nprint(c, d)\n\n'''\n[1, 2, 3] [1, 2, 3]\n[] []\n{'x': 1, 'y': 2} {'x': 1, 'y': 2}\n{} {}\nclear\u53ef\u4ee5\u7406\u89e3\u4e3a\u662f\u6e05\u9664\u6307\u9488\u6307\u5411\u6240\u5728\u5730\u5740\u7684\u5185\u5b58\n'''\n")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u96c6\u5408\u91cc\u9762\u4e0d\u80fd\u5305\u542b\u6709\u5217\u8868\u6216\u5b57\u5178")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5217\u8868\u81ea\u5df1 append \u81ea\u8eab\u7684\u65f6\u5019\u4f1a\u65e0\u7a77\u9012\u5f52 ",(0,l.kt)("inlineCode",{parentName:"p"},"lst.append(list)")))),(0,l.kt)("h2",{id:"5-\u6587\u4ef6"},"5. \u6587\u4ef6"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5728\u8868\u793a\u8def\u5f84\u7684\u5b57\u7b26\u4e32\u4e2d ",(0,l.kt)("inlineCode",{parentName:"li"},"/")," \u7b49\u540c\u4e8e ",(0,l.kt)("inlineCode",{parentName:"li"},"\\"),"\uff0c\u4f46 ",(0,l.kt)("inlineCode",{parentName:"li"},"\\")," \u53c8\u5fc5\u987b\u8f6c\u4e49\u4e3a ",(0,l.kt)("inlineCode",{parentName:"li"},"\\\\"))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-python"},'"D:\\\\Dir\\\\file.txt"\n\n"D:/Dir/file.txt"\n')),(0,l.kt)("h2",{id:"7-\u9762\u5411\u5bf9\u8c61\u7684\u7a0b\u5e8f\u8bbe\u8ba1"},"7. \u9762\u5411\u5bf9\u8c61\u7684\u7a0b\u5e8f\u8bbe\u8ba1"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"dir()")," \u662f\u53ef\u4ee5\u8fd4\u56de\u5f53\u524d\u5bf9\u8c61\u91cc\u9762\u7684\u6240\u6709\u53c2\u6570 \u5305\u62ec\u65b9\u6cd5\u548c\u5c5e\u6027")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u591a\u7ee7\u627f\u65f6\uff0c\u5982\u679c\u5176\u7236\u7c7b\u5f53\u505a\u6709\u5171\u540c\u7684\u65b9\u6cd5\u65f6\uff0c\u5b50\u7c7b\u8c03\u7528\u4f1a\u4ee5\u7b2c\u4e00\u4e2a\u4e3a\u51c6\uff0c\u5373\u5148\u67e5\u627e\u5148\u8c03\u7528\u3002"))))}y.isMDXComponent=!0}}]);