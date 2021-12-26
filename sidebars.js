/**
 * 创建侧边栏使您能够：
 - 创建一个有序的文档组
 - 为该组的每个文档呈现侧边栏
 - 提供下一个上一个导航

 侧边栏可以从文件系统生成，也可以在此处明确定义。

 根据需要创建任意数量的侧边栏。
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // 默认情况下，Docusaurus 从 docs 文件夹结构生成侧边栏
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // 但是您可以手动创建侧边栏
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};

module.exports = sidebars;