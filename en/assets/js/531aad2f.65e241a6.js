"use strict";(self.webpackChunkdanyow=self.webpackChunkdanyow||[]).push([[7439],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return h}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=s(t),h=a,d=c["".concat(p,".").concat(h)]||c[h]||m[h]||l;return t?r.createElement(d,i(i({ref:n},u),{},{components:t})):r.createElement(d,i({ref:n},u))}));function h(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,i=new Array(l);i[0]=c;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var s=2;s<l;s++)i[s]=t[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},4335:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return s},assets:function(){return u},toc:function(){return m},default:function(){return h}});var r=t(7462),a=t(3366),l=(t(7294),t(3905)),i=["components"],o={layout:"post",title:"zsh\u7684\u4f7f\u7528",categories:"Mac \u7b14\u8bb0 item2 zsh antigen",comments:!0,date:"2019-08-21 23:33:55 +0800",published:!0},p=void 0,s={permalink:"/en/blog/2019/zsh",editUrl:"https://github.com/danyow/danyow/edit/main/blog/blog/2019/zsh.md",source:"@site/blog/2019/zsh.md",title:"zsh\u7684\u4f7f\u7528",description:"Title:\u8c8c\u4f3c\u8fd9\u6837\u53ef\u4ee5\u8ba9\u4f60\u7684\u7ec8\u7aef\u53d8\u5f97\u5f88\u597d\u770b\u5462",date:"2019-08-21T15:33:55.000Z",formattedDate:"August 21, 2019",tags:[],readingTime:2.605,truncated:!1,authors:[],prevItem:{title:"vscode\u63d2\u4ef6\u5f00\u53d1",permalink:"/en/blog/2019/vscode/plugin"},nextItem:{title:"Mac\u7684\u5305\u7ba1\u7406\u5de5\u5177brew",permalink:"/en/blog/2019/brew"}},u={authorsImageUrls:[]},m=[{value:"\u4f7f\u7528 <em>zsh</em>",id:"\u4f7f\u7528-zsh",children:[],level:2},{value:"\u4f7f\u7528 <em>antigen</em> \u6765\u5b89\u88c5 <em>oh my zsh</em>",id:"\u4f7f\u7528-antigen-\u6765\u5b89\u88c5-oh-my-zsh",children:[{value:"\u5173\u4e8e <em>antigen</em> \u7684\u7b80\u5355\u4ecb\u7ecd",id:"\u5173\u4e8e-antigen-\u7684\u7b80\u5355\u4ecb\u7ecd",children:[],level:3}],level:2},{value:"\u65b0\u5efa <strong>.zshrc</strong> \u6587\u4ef6 \u586b\u5165\u4e0b\u9762\u5185\u5bb9",id:"\u65b0\u5efa-zshrc-\u6587\u4ef6-\u586b\u5165\u4e0b\u9762\u5185\u5bb9",children:[],level:2},{value:"\u8fd9\u65f6\u5019\u7ec8\u7aef\u754c\u9762\u4f1a\u5448\u73b0\u4e3a\u90e8\u5206\u4e71\u7801, \u56e0\u4e3a\u7f3a\u5c11\u5bf9\u5e94\u7684\u56fe\u6807\u5b57\u4f53",id:"\u8fd9\u65f6\u5019\u7ec8\u7aef\u754c\u9762\u4f1a\u5448\u73b0\u4e3a\u90e8\u5206\u4e71\u7801-\u56e0\u4e3a\u7f3a\u5c11\u5bf9\u5e94\u7684\u56fe\u6807\u5b57\u4f53",children:[],level:2},{value:"\u5728\u5bf9\u5e94\u7684\u7ec8\u7aef\u5de5\u5177\u5185\u9009\u62e9\u5b89\u88c5\u7684\u5b57\u4f53",id:"\u5728\u5bf9\u5e94\u7684\u7ec8\u7aef\u5de5\u5177\u5185\u9009\u62e9\u5b89\u88c5\u7684\u5b57\u4f53",children:[],level:2}],c={toc:m};function h(e){var n=e.components,t=(0,a.Z)(e,i);return(0,l.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Title:\u8c8c\u4f3c\u8fd9\u6837\u53ef\u4ee5\u8ba9\u4f60\u7684\u7ec8\u7aef\u53d8\u5f97\u5f88\u597d\u770b\u5462"),(0,l.kt)("h2",{id:"\u4f7f\u7528-zsh"},"\u4f7f\u7528 ",(0,l.kt)("em",{parentName:"h2"},"zsh")),(0,l.kt)("p",null,"\u5207\u6362\u9ed8\u8ba4\u7684\u7ec8\u7aef ",(0,l.kt)("em",{parentName:"p"},"zsh"),", \u8fd9\u4f1a\u63d0\u793a\u4f60\u8f93\u5165\u5bc6\u7801."),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"chsh -s /bin/zsh")),(0,l.kt)("p",null,"\u5982\u679c\u60f3\u6539\u56de\u6765\u7684\u8bdd"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"chsh -s /bin/bash")),(0,l.kt)("h2",{id:"\u4f7f\u7528-antigen-\u6765\u5b89\u88c5-oh-my-zsh"},"\u4f7f\u7528 ",(0,l.kt)("em",{parentName:"h2"},"antigen")," \u6765\u5b89\u88c5 ",(0,l.kt)("em",{parentName:"h2"},"oh my zsh")),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"brew install antigen")),(0,l.kt)("p",null,"\u8fd9\u91cc\u5b89\u88c5\u5b8c\u540e\u4f1a\u6709\u4e2a\u63d0\u793a\u8bf4: \u6e90\u76ee\u5f55\u5728\u67d0\u4e2a\u4f4d\u7f6e, \u8ba9\u4f60\u81ea\u5df1\u5199\u5230 ",(0,l.kt)("strong",{parentName:"p"},".zshrc")," \u91cc\u9762\u53bb."),(0,l.kt)("h3",{id:"\u5173\u4e8e-antigen-\u7684\u7b80\u5355\u4ecb\u7ecd"},"\u5173\u4e8e ",(0,l.kt)("em",{parentName:"h3"},"antigen")," \u7684\u7b80\u5355\u4ecb\u7ecd"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u4e00\u6b3e\u7c7b\u4f3c\u5728 ",(0,l.kt)("em",{parentName:"p"},"bash")," \u4e0b\u7ba1\u7406\u7684 ",(0,l.kt)("em",{parentName:"p"},"brew")," \u5de5\u5177, \u56e0\u4e3a\u76f4\u63a5\u4f7f\u7528 ",(0,l.kt)("em",{parentName:"p"},"oh my zsh")," \u4f1a\u4f7f\u5f97\u4f60\u7684\u914d\u7f6e\u53d8\u5f97\u7a0d\u7a0d\u590d\u6742.")),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u5b89\u88c5\u5b98\u65b9\u63d2\u4ef6 ",(0,l.kt)("inlineCode",{parentName:"li"},"antigen bundle brew")),(0,l.kt)("li",{parentName:"ol"},"\u5b89\u88c5",(0,l.kt)("em",{parentName:"li"},"github"),"\u4e0a\u7684\u63d2\u4ef6 ",(0,l.kt)("inlineCode",{parentName:"li"},"antigen bundle zsh-users/zsh-syntax-highlighting")),(0,l.kt)("li",{parentName:"ol"},"\u751f\u6210\u7f13\u5b58, \u52a0\u5feb\u4e0b\u6b21\u8f7d\u5165\u8fc7\u7a0b ",(0,l.kt)("inlineCode",{parentName:"li"},"antigen cache-gen")),(0,l.kt)("li",{parentName:"ol"},"\u66f4\u65b0\u67d0\u4e2a\u6216\u8005\u5168\u90e8\u63d2\u4ef6 ",(0,l.kt)("inlineCode",{parentName:"li"},"antigen update [<bundle-name>]"),": \u5982\u679c\u7559\u7a7a\u90a3\u4e48\u5c31\u662f\u66f4\u65b0\u5168\u90e8."),(0,l.kt)("li",{parentName:"ol"},"\u56de\u6eda\u66f4\u65b0 ",(0,l.kt)("inlineCode",{parentName:"li"},"antigen revert"),": \u56de\u6eda\u5230\u66f4\u65b0\u524d\u7684\u72b6\u6001"),(0,l.kt)("li",{parentName:"ol"},"\u5217\u51fa\u672c\u5730\u5b89\u88c5\u7684\u63d2\u4ef6\u5217\u8868 ",(0,l.kt)("inlineCode",{parentName:"li"},"antigen list [--simple|--short|--long]")),(0,l.kt)("li",{parentName:"ol"},"\u6e05\u7406\u6ca1\u6709\u4f7f\u7528\u5230\u7684\u63d2\u4ef6 ",(0,l.kt)("inlineCode",{parentName:"li"},"antigen cleanup")),(0,l.kt)("li",{parentName:"ol"},"\u5220\u9664\u63d2\u4ef6 ",(0,l.kt)("inlineCode",{parentName:"li"},"antigen purge")),(0,l.kt)("li",{parentName:"ol"},"\u4f7f\u7528zsh\u6846\u67b6 ",(0,l.kt)("inlineCode",{parentName:"li"},"antigen use oh-my-zsh")),(0,l.kt)("li",{parentName:"ol"},"\u4f7f\u7528\u4e3b\u9898 ",(0,l.kt)("inlineCode",{parentName:"li"},"antigen theme")),(0,l.kt)("li",{parentName:"ol"},"\u5e94\u7528\u66f4\u6539 ",(0,l.kt)("inlineCode",{parentName:"li"},"antigen apply")),(0,l.kt)("li",{parentName:"ol"},"\u81ea\u8eab\u66f4\u65b0 ",(0,l.kt)("inlineCode",{parentName:"li"},"antigen selfupdate"))),(0,l.kt)("h2",{id:"\u65b0\u5efa-zshrc-\u6587\u4ef6-\u586b\u5165\u4e0b\u9762\u5185\u5bb9"},"\u65b0\u5efa ",(0,l.kt)("strong",{parentName:"h2"},".zshrc")," \u6587\u4ef6 \u586b\u5165\u4e0b\u9762\u5185\u5bb9"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'source /usr/local/share/antigen/antigen.zsh\n\n# \u52a0\u8f7doh-my-zsh\u5e93\nantigen use oh-my-zsh\n\n# \u52a0\u8f7d\u539f\u7248oh-my-zsh\u4e2d\u7684\u529f\u80fd(robbyrussell\'s oh-my-zsh).\nantigen bundle brew\nantigen bundle command-not-found\nantigen bundle git\nantigen bundle pip\n\n# \u8bed\u6cd5\u9ad8\u4eae\u529f\u80fd\nantigen bundle zsh-users/zsh-syntax-highlighting\n\n# \u4ee3\u7801\u63d0\u793a\u529f\u80fd\nantigen bundle zsh-users/zsh-autosuggestions\n\n# \u81ea\u52a8\u8865\u5168\u529f\u80fd\nantigen bundle zsh-users/zsh-completions\n\n# \u8fd9\u4e2a\u4e0d\u77e5\u9053\u662f\u5565\nantigen bundle zsh-users/zsh-apple-touchbar\n\n# \u52a0\u8f7d\u4e3b\u9898\n# antigen theme robbyrussell\nantigen theme https://github.com/bhilburn/powerlevel9k powerlevel9k\n\n# \u4fdd\u5b58\u66f4\u6539\nantigen apply\n\n## \u914d\u5408powerlevel9k\u4e3b\u9898\u4f7f\u7528\nPOWERLEVEL9K_PROMPT_ON_NEWLINE=true\nPOWERLEVEL9K_RPROMPT_ON_NEWLINE=true\n\nPOWERLEVEL9K_MODE=\'awesome-patched\'\nPOWERLEVEL9K_SHORTEN_DIR_LENGTH=2\nPOWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(os_icon dir vcs)\nPOWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status nvm node_version)\n\nPOWERLEVEL9K_OS_ICON_BACKGROUND="white"\nPOWERLEVEL9K_OS_ICON_FOREGROUND="blue"\nPOWERLEVEL9K_DIR_HOME_FOREGROUND="white"\nPOWERLEVEL9K_DIR_HOME_SUBFOLDER_FOREGROUND="white"\nPOWERLEVEL9K_DIR_DEFAULT_FOREGROUND="white"\n\n')),(0,l.kt)("h2",{id:"\u8fd9\u65f6\u5019\u7ec8\u7aef\u754c\u9762\u4f1a\u5448\u73b0\u4e3a\u90e8\u5206\u4e71\u7801-\u56e0\u4e3a\u7f3a\u5c11\u5bf9\u5e94\u7684\u56fe\u6807\u5b57\u4f53"},"\u8fd9\u65f6\u5019\u7ec8\u7aef\u754c\u9762\u4f1a\u5448\u73b0\u4e3a\u90e8\u5206\u4e71\u7801, \u56e0\u4e3a\u7f3a\u5c11\u5bf9\u5e94\u7684\u56fe\u6807\u5b57\u4f53"),(0,l.kt)("p",null,"\u5728\u7ec8\u7aef\u6267\u884c\u4ee5\u4e0b\u6b65\u9aa4:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"# \u4e0b\u8f7d\ngit clone https://github.com/powerline/fonts.git\n# \u5b89\u88c5\ncd fonts\n./install.sh\n# \u5220\u9664\u5b89\u88c5\u5305\ncd ..\nrm -rf fonts\n")),(0,l.kt)("h2",{id:"\u5728\u5bf9\u5e94\u7684\u7ec8\u7aef\u5de5\u5177\u5185\u9009\u62e9\u5b89\u88c5\u7684\u5b57\u4f53"},"\u5728\u5bf9\u5e94\u7684\u7ec8\u7aef\u5de5\u5177\u5185\u9009\u62e9\u5b89\u88c5\u7684\u5b57\u4f53"),(0,l.kt)("p",null,"\u4ee5 ",(0,l.kt)("em",{parentName:"p"},"VSCode")," \u4e3a\u4f8b, \u5728\u8bbe\u7f6e\u754c\u9762\u5185\u67e5\u627e\u5b57\u4f53, \u7136\u540e\u627e\u5230\u7ec8\u7aef\u8f93\u5165 ",(0,l.kt)("em",{parentName:"p"},"Meslo LG S for Powerline")," \u5c31\u53ef\u4ee5\u4e86!"))}h.isMDXComponent=!0}}]);