import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'CFSM',
  description: 'Cloudflare Secret Manager documentation',
  themeConfig: {
    nav: [{ text: 'Guide', link: '/guide/introduction' }],
    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Introduction', link: '/guide/introduction' }],
      },
    ],
  },
});
