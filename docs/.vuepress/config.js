module.exports = {
  dest: "blog",
  theme: "reco",
  title: "oldshensheep",
  description: "Programming and life",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#FF66CC" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ["link", { rel: "apple-touch-icon", href: "/icons/LatteAndCat.png" }],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/LatteAndCat.svg",
        color: "#FF66CC",
      },
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/LatteAndCat.png",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
  ],
  themeConfig: {
    type: "blog",
    huawei: false,
    nav: [
      { text: "Home", link: "/", icon: "reco-home" },
      { text: "TimeLine", link: "/timeline/", icon: "reco-date" },
      { text: "About", link: "/about/", icon: "reco-account" },
      {
        text: "Toy",
        link: "https://blog.oldshensheep.com/toyweb/",
        icon: "reco-home",
      },
      {
        text: "GitHub",
        link: "https://github.com/oldshensheep",
        icon: "reco-github",
      },
    ],
    friendLink: [],
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "Category", // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "Tag", // 默认 “标签”
      },
    },
    logo: "/avatar.png",
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    subSidebar: "auto",
    sidebarDepth: 1,
    displayAllHeaders: false,
    // 最后更新时间
    lastUpdated: "Last Updated",
    // 作者
    author: "oldshensheep",
    authorAvatar: "/avatar.png",
    // 备案号
    record: "鄂ICP备2021006756号",
    recordLink: "http://www.beian.miit.gov.cn/",
    cyberSecurityRecord: "鄂公网安备42112702000084",
    cyberSecurityLink:
      "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42112702000084",
    // 项目开始时间
    startYear: "2019",

    // valineConfig: {
    //   appId: "YMtbjL3M9vPHQUmdjPMXb86I-MdYXbMMI",
    //   appKey: "vlbsVfFyEnSBTtRxF26R53BA",
    //   placeholder: "写点什么吧",
    //   avatar: "wavatar",
    // },
  },
  markdown: {
    lineNumbers: true,
    // anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2, 3] },
    extendMarkdown: (md) => {
      // 使用更多的 markdown-it 插件!
      md.use(require("markdown-it-footnote"));
    },
  },
  plugins: [
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: {
          message: "发现新内容可用",
          buttonText: "刷新",
        },
      },
    ],
    [
      "permalink-pinyin",
      {
        lowercase: true,
        separator: "-",
      },
    ],
  ],
};
