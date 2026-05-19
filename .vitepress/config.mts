import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "🏠",
  description: "在时代洪流中给自己的精神荒漠种一棵树",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '全部文章', link: '/' }
    ],
    // 全局大纲配置
    outline: {
      level: [2, 6],        // 显示 h2 到 h6 的所有标题
      label: '页面导航'      // 将标题改为 '页面导航'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kuny1' }
    ]
  },
  lastUpdated: true
})
