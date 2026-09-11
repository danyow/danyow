// @ts-check
const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: ':D',
  tagline: 'O ever youthful, O ever weeping',
  url: 'https://danyow.cn',
  baseUrl: process.env.SITE_BASE_URL || '/danyow/',
  onBrokenLinks: 'ignore',
  onDuplicateRoutes: 'ignore',
  favicon: 'img/favicon.ico',
  organizationName: 'danyow',
  projectName: 'danyow',
  markdown: {
    format: 'detect',
    hooks: {onBrokenMarkdownLinks: 'ignore'},
  },
  presets: [
    ['classic', {
      blog: {
        showReadingTime: true,
        editUrl: 'https://github.com/danyow/danyow/edit/main/blog',
        onUntruncatedBlogPosts: 'ignore',
      },
      theme: {
        customCss: ['./src/css/docusaurus-1.css', './src/css/prism.css', './src/css/customTheme.css', './src/css/custom.css'],
      },
    }],
  ],
  plugins: [
    ['@docusaurus/plugin-content-docs', {
      id: 'note', path: 'note', routeBasePath: 'note',
      sidebarPath: require.resolve('./sidebars.js'),
      editUrl: 'https://github.com/danyow/danyow/edit/main/note',
      showLastUpdateAuthor: true, showLastUpdateTime: true,
    }],
    ['@docusaurus/plugin-content-docs', {
      id: 'lua', path: 'lua', routeBasePath: 'lua',
      sidebarPath: require.resolve('./sidebars.js'),
      editUrl: 'https://github.com/danyow/danyow/edit/main/lua',
      showLastUpdateAuthor: true, showLastUpdateTime: true,
    }],
    ['@docusaurus/plugin-content-docs', {
      id: 'unity', path: 'unity', routeBasePath: 'unity',
      sidebarPath: require.resolve('./sidebars.js'),
      editUrl: 'https://github.com/danyow/danyow/edit/main/unity',
      showLastUpdateAuthor: true, showLastUpdateTime: true,
    }],
    ['@docusaurus/plugin-content-docs', {
      id: 'ai-engine-watch', path: '.generated/ai-engine-watch',
      routeBasePath: 'ai-engine-watch', sidebarPath: false,
      showLastUpdateAuthor: false, showLastUpdateTime: false,
    }],
    [require.resolve('@easyops-cn/docusaurus-search-local'), {
      hashed: true, language: ['zh', 'en'],
    }],
  ],
  i18n: {defaultLocale: 'zh', locales: ['zh']},
  themeConfig: {
    navbar: {
      title: ':D', style: 'primary', hideOnScroll: false,
      items: [
        {type: 'doc', docId: 'itinerary', docsPluginId: 'note', position: 'left', label: '笔记'},
        {type: 'doc', docId: 'learn', docsPluginId: 'lua', position: 'left', label: 'Lua'},
        {type: 'doc', docId: 'Glossary', docsPluginId: 'unity', position: 'left', label: 'Unity'},
        {to: '/blog', position: 'left', label: '博客'},
        {type: 'doc', docId: 'index', docsPluginId: 'ai-engine-watch', position: 'left', label: 'AI 引擎观察'},
        {href: 'https://github.com/danyow/danyow', position: 'right', className: 'header-github-link', 'aria-label': 'GitHub repository'},
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} danyow, Inc. 使用 Docusaurus 构建。`,
      logo: {src: 'img/logo.svg'},
    },
    prism: {
      theme: themes.github, darkTheme: themes.dracula,
      defaultLanguage: 'javascript', additionalLanguages: ['lua', 'csharp'],
    },
  },
};
module.exports = config;
