const AnyText = () => {
}

AnyText.BlogListPaginator = {
  newerEntries: [
    "崭新",
  ],
  olderEntries: [
    '斑驳',
  ]
}

AnyText.BlogPostItem = {
  oneReadingTime: [
    '1分钟的阅读量',
    '1分钟之内',
  ],
  moreReadingTime: [
    '分钟阅读量',
    '分钟之内',
  ],
  readMore: [
    '阅读更多',
  ],
}

AnyText.BlogPostPaginator = {
  newerPost: [
    "前",
    "新",
  ],
  olderPost: [
    "后",
    "旧",
  ],
}

AnyText.CodeBlock = {
  copy: [
    "复制",
  ],
  copied: [
    "已复制",
  ],
}

AnyText.DocPaginatorNavLink = {
  next: [
    "下钻",
    "下一篇",
    "下篇",
    "下文",
    "下卷",
    "下回",
  ],
  previous: [
    "上钻",
    "上一篇",
    "上篇",
    "上文",
    "上卷",
    "上回",
  ],
}

AnyText.EditThisPage = {
  editThisPage: [
    "编辑该页面",
    "编辑该页",
    "编辑",
  ],
}

AnyText.Heading = {
  headingLinkTitle: [
    "直链到该处",
    "跳转到该处",
    "置顶该行",
  ],
}

/**
 *
 * @param texts Array
 * @constructor
 */

function GetAnyText(texts) {
  return texts[Math.floor(Math.random() * texts.length)]
}

AnyText.GetAny = GetAnyText

export default AnyText

