import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "🏠",
  description: "在时代洪流中给自己的精神荒漠种一棵树",
  themeConfig: {
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '全部文章', link: '/' }
    ],

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kuny1' }
    ]
  },
  lastUpdated: true
})
