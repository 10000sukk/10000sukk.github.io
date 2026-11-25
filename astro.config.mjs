// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://10000sukk.github.io',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
