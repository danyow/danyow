// @ts-check
// Note: 类型注释允许类型检查和 IDE 自动完成

const versions = require('./tutorial_versions.json');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');


// 这可能只对 beta 阶段有意义，暂时
function getNextBetaVersionName() {
  const expectedPrefix = 'v';

  const lastReleasedVersion = versions[0];
  if (!lastReleasedVersion.includes(expectedPrefix)) {
    throw new Error(
      'this code is only meant to be used during the 2.0 beta phase.',
    );
  }
  const version = parseInt(lastReleasedVersion.replace(expectedPrefix, ''), 10);
  return `${expectedPrefix}${version + 1}`;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '🧩',
  tagline: '你做三四月的事，在八九月自有答案。',
  url: 'https://danyow.cn',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'danyow', // 通常是您的 gitHub.com/<组织用户名>。
  projectName: 'danyow', // 通常是您的仓库名称。

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // 请将其更改为您的仓库。
          editUrl: 'https://github.com/danyow/danyow/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // 请将其更改为您的仓库。
          editUrl:
            'https://github.com/danyow/danyow/edit/main/blog',
        },
        theme: {
          customCss: [
            '../src/css/docusaurus-1.css',
            '../src/css/prism.css',
            '../src/css/customTheme.css',
            '../src/css/custom.css',
          ],
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tutorial',
        path: 'tutorial',
        routeBasePath: 'tutorial',
        sidebarPath: require.resolve('./sidebarsTutorial.js'),
        editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        versions: {
          current: {
            label: `${getNextBetaVersionName()} 🚧`,
          },
        },
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // ... Your options.
        // 推荐使用 `hashed`，因为索引文件的长期缓存是可能的。
        hashed: true,
        // 对于使用中文的文档，建议将`language`设置为：
        // ```
        language: ["zh", "en"],
        // ```
        // 在语言中应用`zh`时，请在你的项目中安装`nodejieba`。
      },
    ],
  ],

  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '🧩',
        logo: {
          alt: '🧩 logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'greeting',
            position: 'left',
            label: '笔记',
          },
          {to: '/blog', label: '博客', position: 'left'},
          // right
          {
            type: 'docsVersionDropdown',
            docsPluginId: 'tutorial',
            label: '教程',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/danyow/danyow',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      // 启用 `algolia` 搜索
      // algolia: {
      //   // 如果 Algolia 没有为您提供任何 appId，请使用“BH4D9OD16A”
      //   appId: 'S3KRFC060Q',
      //   // 公共 API 密钥：提交它是安全的
      //   apiKey: '06d01f9fee4e5ca81a5c2a3d789de5f8',
      //   indexName: 'danyow',
      //   // 可选：请参阅下面的文档部分
      //   contextualSearch: true,
      //   // 可选：指定应通过 window.location 而不是 history.push 进行导航的域。当我们的 Algolia 配置抓取多个文档站点并且我们想要使用 window.location.href 导航到它们时很有用。
      //   externalUrlRegex: 'external\\.com|domain\\.com',
      //   // 可选：Algolia 搜索参数
      //   searchParameters: {},
      //   //... 其他 Algolia 参数
      // },
      footer: {
        style: 'dark',
        copyright: `版权 © ${new Date().getFullYear()} danyow, Inc. 使用 Docusaurus 构建。`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
