"use strict";(self.webpackChunkdanyow=self.webpackChunkdanyow||[]).push([[2869],{3905:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return d}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),c=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},s=function(e){var n=c(e.components);return r.createElement(l.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=c(t),d=a,k=u["".concat(l,".").concat(d)]||u[d]||m[d]||o;return t?r.createElement(k,i(i({ref:n},s),{},{components:t})):r.createElement(k,i({ref:n},s))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=u;var p={};for(var l in n)hasOwnProperty.call(n,l)&&(p[l]=n[l]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var c=2;c<o;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},5365:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return p},contentTitle:function(){return l},metadata:function(){return c},assets:function(){return s},toc:function(){return m},default:function(){return d}});var r=t(7462),a=t(3366),o=(t(7294),t(3905)),i=["components"],p={layout:"post",title:"Scoop\u7684\u5b89\u88c5",categories:"Windows \u7b14\u8bb0 scoop",comments:!0,date:"2020/6/14 14:55:00 +0800",published:!0},l=void 0,c={permalink:"/blog/2019/scoop",editUrl:"https://github.com/danyow/danyow/edit/main/blog/blog/2019/scoop.md",source:"@site/blog/2019/scoop.md",title:"Scoop\u7684\u5b89\u88c5",description:"Title: \u76ee\u524d\u6682\u4e0d\u63a8\u8350, \u56e0\u4e3a\u81ea\u5e26\u7684\u8f6f\u4ef6\u8f83\u5c11, \u800c\u4e14\u66f4\u591a\u7684\u9700\u8981\u4f7f\u7528\u5230\u522b\u4eba\u7684 *Bucket* .",date:"2020-06-14T06:55:00.000Z",formattedDate:"2020\u5e746\u670814\u65e5",tags:[],readingTime:2.6,truncated:!1,authors:[],prevItem:{title:"Clash\u7684\u4f7f\u7528",permalink:"/blog/2020/clash"},nextItem:{title:"\u90e8\u7f72\u65b0\u5b89\u88c5\u7684centos\u670d\u52a1\u5668",permalink:"/blog/2020/server"}},s={authorsImageUrls:[]},m=[{value:"Scoop\u7684\u5b89\u88c5",id:"scoop\u7684\u5b89\u88c5",children:[],level:2}],u={toc:m};function d(e){var n=e.components,t=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Title: ",(0,o.kt)("del",{parentName:"p"},"\u76ee\u524d\u6682\u4e0d\u63a8\u8350, \u56e0\u4e3a\u81ea\u5e26\u7684\u8f6f\u4ef6\u8f83\u5c11, \u800c\u4e14\u66f4\u591a\u7684\u9700\u8981\u4f7f\u7528\u5230\u522b\u4eba\u7684 ",(0,o.kt)("em",{parentName:"del"},"Bucket")," .")),(0,o.kt)("p",null,"\u53cd\u7701\u4e00\u4e0b\uff0c\u6bd4\u8d77\u4e4b\u524d\u7684 ",(0,o.kt)("em",{parentName:"p"},"Chocolatey")," \u6765\u8bf4\uff0c\u8fd8\u662f\u63a8\u8350\u7684\uff0c\u56e0\u4e3a\u5b83\u66f4\u52a0\u9002\u5408\u7a0b\u5e8f\u5458\u548c\u5177\u6709\u9ad8\u5ea6\u5f3a\u8feb\u75c7\u7684\u60a3\u8005\u3002"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4f18\u70b9\uff1a")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"\u73af\u5883\u548c\u540e\u7eed\u5b89\u88c5\u7684\u8f6f\u4ef6\u90fd\u53ef\u4ee5\u4e0d\u653e\u5728",(0,o.kt)("strong",{parentName:"li"},"C"),"\u76d8"),(0,o.kt)("li",{parentName:"ol"},"\u6269\u5c55\u5305\u4e5f\u6bd4\u8f83\u4e30\u5bcc")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u7f3a\u70b9\uff1a")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"\u5982\u679c\u7f51\u901f\u6162\u7684\u60c5\u51b5\u4e0b\uff08\u56e0\u4e3a\u4f7f\u7528\u5230\u4e86 ",(0,o.kt)("em",{parentName:"li"},"github")," \uff09\u5b89\u88c5\u67d0\u4e2a\u5305\u7684\u65f6\u5019\uff0c\u53ef\u80fd\u4f1a\u51fa\u73b0\u534a\u5929\u5b89\u88c5\u4e0d\u4e0a\u7684\u60c5\u51b5\uff0c\u8fd9\u65f6\u5019\u53d6\u6d88\u7684\u8bdd\u4f1a\u4f7f\u5f97 ",(0,o.kt)("em",{parentName:"li"},"scoop")," \u8bef\u4ee5\u4e3a\u5b89\u88c5\u5b8c\u6210\uff0c\u8fd9\u65f6\u9700\u8981\u5378\u8f7d\u3002"),(0,o.kt)("li",{parentName:"ol"},"\u540e\u7eed\u4f9d\u636e\u4f7f\u7528\u60c5\u51b5\u8865\u5145")),(0,o.kt)("h2",{id:"scoop\u7684\u5b89\u88c5"},"Scoop\u7684\u5b89\u88c5"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("em",{parentName:"p"},"PowerShell")," \u4e0b\u8fd0\u884c\u4e0b\u8ff0\u5185\u5bb9\uff0c\u786e\u4fdd ",(0,o.kt)("em",{parentName:"p"},"PowerShell")," \u5141\u8bb8\u53ef\u4ee5\u6267\u884c\u672c\u5730\u811a\u672c\u3002"),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"Set-ExecutionPolicy RemoteSigned -scope CurrentUser"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u7136\u540e\u5b89\u88c5 ",(0,o.kt)("em",{parentName:"p"},"Scoop")," \uff0c\u770b\u7f51\u901f\u6765\u7684\u3002"),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')")),(0,o.kt)("p",{parentName:"li"},"or \u66f4\u77ed\u7684"),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"iwr -useb get.scoop.sh | iex"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u8fdb\u5165\u6876\u5b50\u73af\u5883\u51c6\u5907\u9636\u6bb5\u3002\u5373\u6dfb\u52a0 ",(0,o.kt)("em",{parentName:"p"},"Bucket")," \u5e93\u3002\u4f46\u7531\u4e8e ",(0,o.kt)("em",{parentName:"p"},"Bucket")," \u662f\u4f9d\u6258\u4e8e ",(0,o.kt)("em",{parentName:"p"},"Github")," \uff0c\u6240\u4ee5\u8981\u5148\u5b89\u88c5 ",(0,o.kt)("em",{parentName:"p"},"git")," \u73af\u5883"),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"scoop install git")))),(0,o.kt)("p",null,"\u5982\u679c\u4f60\u6ca1\u6709 7zip \u7684\u8bdd\uff0c\u4f1a\u987a\u624b\u7ed9\u4f60\u5b89\u88c5git\u7684\u4f9d\u8d56\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-txt"},"  7zip 21.06 [main]\n  adb 31.0.3 [main]\n  adopt8-hotspot 8u292-b10 [java]\n  android-sdk 4333796 [extras]\n  ant 1.10.12 [main]\n  archwsl 21.8.28.0 [extras]\n  beyondcompare-zh-cn 4.4.0.25886 [dorado]\n  brotli 1.0.9_6 [main]\n  cacert 2021-10-26 [main]\n  ccleaner 5.87.9306 [extras]\n  clash-for-windows 0.19.1 [dorado]\n  cmake 3.22.1 [main]\n  codeblocks-mingw 20.03 [extras]\n  curl 7.80.0 [main]\n  dark 3.11.2 [main]\n  dingtalk 6.3.5.10278702 [dorado]\n  DirectX 9.29.1974.1-June2010 [Scoop-Ash258]\n  diskgenius 5.4.2.1239 [extras]\n  docker-machine 0.16.2 [silver886]\n  docker-nightly nightly-20211121 [main]\n  dotnet-sdk 6.0.100 [main]\n  EpicGamesLauncher 13.0.0 [dorado]\n  gcc 11.2.0-9.0.0-r3 [main]\n  git 2.34.1.windows.1 [main]\n  github 2.9.5 [extras]\n  gradle-bin 7.3.1 [main]\n  innounp 0.50 [main]\n  ipfs-desktop 0.17.0 [extras]\n  jetbrains-toolbox 1.22.10774 [extras]\n  k2pdfopt 2.53 [seu]\n  lcow v4.14.35-v0.3.9 [main]\n  lessmsi 1.10.0 [main]\n  meshlab 2021.10 [extras]\n  microsoftedge  *failed*\n  mls-software-openssh 8.8p1-1 [main]\n  mongodb 5.2.0-rc0 [main]\n  motrix 1.6.11 [extras]\n  msys2 2021-11-30 [main]\n  nginx 1.21.4 [main]\n  nodejs-lts 16.13.1 [main]\n  nuget 6.0.0 [main]\n  nuwen-mingw-gcc 11.2.0-18.0 [dorado]\n  nvidia-display-driver-dch-np 7 *failed*\n  obs-studio 27.1.3 [extras]\n  office-tool-plus 8.1.5.15 [Master-Hash]\n  openjdk 17.0.1-12 [java]\n  openssl 3.0.0 [main]\n  oraclejdk8 8u291 [iszy]\n  oraclejre8 8u311 [java]\n  poedit 3.0.6387 [extras]\n  potplayer 211118 [extras]\n  powertoys-np 0.51.1 [nonportable]\n  premake 5.0.0-beta1 [main]\n  protobuf 3.19.1 [extras]\n  pxcook 3.9.960.202101211055 [dorado]\n  python 3.10.1 [main]\n  python27 2.7.18 [versions]\n  RevokeMsgPatcher 1.1 [Darkatse]\n  rime-weasel-np 0.14.3.0 [scoop-jingyu9575]\n  ruby 3.0.3-1 [main]\n  rufus 3.17 [extras]\n  Sejda-pdf 7.3.7 [extras]\n  SogouPinyin-Portable 0.3 [scoop-zapps]\n  sourcetree 3.4.7 [extras]\n  steam nightly-20200928 [extras]\n  sudo 0.2020.01.26 [main]\n  telnet msys-inetutils-1.7-1 [main]\n  todesk 4.1.0 [dorado]\n  TranslucentTb 2020.2 [dorado]\n  VcXsrv 1.20.9.0 [extras]\n  virtualbox-np 6.1.30 [nonportable]\n  vscode 1.63.0 [extras]\n  wechat nightly-20200613 [dorado]\n  wget 1.21.2 [main]\n  winscp 5.19.5 [extras]\n  Writage 2.7.2 [cvp]\n  yarn 1.22.15 [main]\n")))}d.isMDXComponent=!0}}]);