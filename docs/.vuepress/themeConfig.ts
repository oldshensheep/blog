import { defineThemeConfig } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default defineThemeConfig({

  author: {
    name: "oldshensheep",
    url: "https://oldshensheep.github.io",
  },

  iconPrefix: "iconfont icon-",

  logo: "/avatar.png",

  repo: "https://github.com/oldshensheep",


  // navbar
  navbar: navbar,

  // sidebar
  sidebar: 'heading',

  footer: "Default footer",

  displayFooter: false,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    description: "Sheep",
    intro: "/intro.html",
    medias: {
      GitHub: "https://github.com/oldshensheep",
      Steam: "https://steamcommunity.com/id/oldshensheep",
      'last.fm': ["https://last.fm/user/oldshensheep", '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 291.328 291.328" style="enable-background:new 0 0 291.328 291.328;" xml:space="preserve"><g>	<path style="fill:#E2574C;" d="M145.659,0.004c80.45,0,145.669,65.219,145.669,145.66S226.109,291.324,145.66,291.324		C65.219,291.324,0,226.104,0,145.663S65.219,0.004,145.659,0.004z"/>	<path style="fill:#FFFFFF;" d="M202.303,137.507l-4.16-1.229c-10.205-2.959-16.341-4.743-16.341-12.072		c0-5.936,4.962-10.242,11.808-10.242c5.244,0,9.158,2.012,12.663,6.527c0.319,0.428,0.947,0.564,1.457,0.319l10.278-4.834		l0.583-0.637l-0.109-0.819c-5.508-9.049-13.464-13.446-24.307-13.446c-16.496,0-27.147,9.213-27.147,23.469		c0,14.584,10.315,20.483,29.341,26.264c11.006,3.396,15.895,5.189,15.895,12.427c0,8.148-7.948,13.992-18.808,13.656		c-11.361-0.364-14.812-5.927-19.154-15.039c-7.328-15.431-15.667-33.447-15.74-33.62c-8.375-17.834-24.971-28.039-45.537-28.039		c-27.166,0-49.269,20.392-49.269,45.482c0,25.081,22.104,45.482,49.269,45.482c14.812,0,28.704-6.063,38.108-16.642l0.164-1.083		l-6.209-13.228l-1.011-0.637l-1.056,0.564c-5.863,10.351-17.361,16.769-29.997,16.769c-18.644,0-33.802-13.992-33.802-31.226		c0-17.215,15.167-31.226,33.802-31.226c13.574,0,26.009,7.429,30.944,18.535l15.367,32.355l1.757,3.623		c6.955,14.939,17.161,21.621,33.147,21.676c18.99,0,33.32-11.616,33.32-27.029C227.566,148.121,218.307,142.322,202.303,137.507z"		/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});