"use strict";(self.webpackChunkdanyow=self.webpackChunkdanyow||[]).push([[3470],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=d(n),m=r,A=p["".concat(s,".").concat(m)]||p[m]||c[m]||o;return n?a.createElement(A,i(i({ref:t},u),{},{components:n})):a.createElement(A,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var d=2;d<o;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},8674:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return u},Highlight:function(){return c},default:function(){return m}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),i=["components"],l={sidebar_position:4},s="Markdown Features",d={unversionedId:"tutorial-basics/markdown-features",id:"tutorial-basics/markdown-features",title:"Markdown Features",description:"Docusaurus supports Markdown and a few additional features.",source:"@site/tutorial/tutorial-basics/markdown-features.mdx",sourceDirName:"tutorial-basics",slug:"/tutorial-basics/markdown-features",permalink:"/en/tutorial/next/tutorial-basics/markdown-features",editUrl:"https://github.com/facebook/docusaurus/edit/main/website/tutorial/tutorial-basics/markdown-features.mdx",tags:[],version:"current",lastUpdatedBy:"danyow",lastUpdatedAt:1640162375,formattedLastUpdatedAt:"12/22/2021",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Create a Blog Post",permalink:"/en/tutorial/next/tutorial-basics/create-a-blog-post"},next:{title:"Deploy your site",permalink:"/en/tutorial/next/tutorial-basics/deploy-your-site"}},u=[{value:"Front Matter",id:"front-matter",children:[],level:2},{value:"Links",id:"links",children:[],level:2},{value:"Images",id:"images",children:[],level:2},{value:"Code Blocks",id:"code-blocks",children:[],level:2},{value:"Admonitions",id:"admonitions",children:[],level:2},{value:"MDX and React Components",id:"mdx-and-react-components",children:[],level:2}],c=function(e){var t=e.children,n=e.color;return(0,o.kt)("span",{style:{backgroundColor:n,borderRadius:"20px",color:"#fff",padding:"10px",cursor:"pointer"},onClick:function(){alert("You clicked the color "+n+" with label "+t)}},t)},p={toc:u,Highlight:c};function m(e){var t=e.components,l=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},p,l,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"markdown-features"},"Markdown Features"),(0,o.kt)("p",null,"Docusaurus supports ",(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("a",{parentName:"strong",href:"https://daringfireball.net/projects/markdown/syntax"},"Markdown"))," and a few ",(0,o.kt)("strong",{parentName:"p"},"additional features"),"."),(0,o.kt)("h2",{id:"front-matter"},"Front Matter"),(0,o.kt)("p",null,"Markdown documents have metadata at the top called ",(0,o.kt)("a",{parentName:"p",href:"https://jekyllrb.com/docs/front-matter/"},"Front Matter"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text",metastring:'title="my-doc.md"',title:'"my-doc.md"'},"// highlight-start\n---\nid: my-doc-id\ntitle: My document title\ndescription: My document description\nslug: /my-custom-url\n---\n// highlight-end\n\n## Markdown heading\n\nMarkdown text with [links](./hello.md)\n")),(0,o.kt)("h2",{id:"links"},"Links"),(0,o.kt)("p",null,"Regular Markdown links are supported, using url paths or relative file paths."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-md"},"Let's see how to [Create a page](/create-a-page).\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-md"},"Let's see how to [Create a page](./create-a-page.md).\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Result:")," Let's see how to ",(0,o.kt)("a",{parentName:"p",href:"/en/tutorial/next/tutorial-basics/create-a-page"},"Create a page"),"."),(0,o.kt)("h2",{id:"images"},"Images"),(0,o.kt)("p",null,"Regular Markdown images are supported."),(0,o.kt)("p",null,"Add an image at ",(0,o.kt)("inlineCode",{parentName:"p"},"static/img/docusaurus.png")," and display it in Markdown:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-md"},"![Docusaurus logo](/img/docusaurus.png)\n")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Docusaurus logo",src:n(5731).Z})),(0,o.kt)("h2",{id:"code-blocks"},"Code Blocks"),(0,o.kt)("p",null,"Markdown code blocks are supported with Syntax highlighting."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'```jsx title="src/components/HelloDocusaurus.js"\nfunction HelloDocusaurus() {\n    return (\n        <h1>Hello, Docusaurus!</h1>\n    )\n}\n```\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="src/components/HelloDocusaurus.js"',title:'"src/components/HelloDocusaurus.js"'},"function HelloDocusaurus() {\n  return <h1>Hello, Docusaurus!</h1>;\n}\n")),(0,o.kt)("h2",{id:"admonitions"},"Admonitions"),(0,o.kt)("p",null,"Docusaurus has a special syntax to create admonitions and callouts:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},":::tip My tip\n\nUse this awesome feature option\n\n:::\n\n:::danger Take care\n\nThis action is dangerous\n\n:::\n")),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"My tip")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Use this awesome feature option"))),(0,o.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"Take care")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This action is dangerous"))),(0,o.kt)("h2",{id:"mdx-and-react-components"},"MDX and React Components"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://mdxjs.com/"},"MDX")," can make your documentation more ",(0,o.kt)("strong",{parentName:"p"},"interactive")," and allows using any ",(0,o.kt)("strong",{parentName:"p"},"React components inside Markdown"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"export const Highlight = ({children, color}) => (\n  <span\n    style={{\n      backgroundColor: color,\n      borderRadius: '20px',\n      color: '#fff',\n      padding: '10px',\n      cursor: 'pointer',\n    }}\n    onClick={() => {\n      alert(`You clicked the color ${color} with label ${children}`)\n    }}>\n    {children}\n  </span>\n);\n\nThis is <Highlight color=\"#25c2a0\">Docusaurus green</Highlight> !\n\nThis is <Highlight color=\"#1877F2\">Facebook blue</Highlight> !\n")),(0,o.kt)("p",null,"This is ",(0,o.kt)(c,{color:"#25c2a0",mdxType:"Highlight"},"Docusaurus green")," !"),(0,o.kt)("p",null,"This is ",(0,o.kt)(c,{color:"#1877F2",mdxType:"Highlight"},"Facebook blue")," !"))}m.isMDXComponent=!0},5731:function(e,t){t.Z="data:image/png;base64,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"}}]);