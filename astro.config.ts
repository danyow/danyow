import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import { themeConfig } from './src/config'
export default defineConfig({
  site: themeConfig.site.url, base: themeConfig.site.base,
  output: 'static', outDir: './dist', trailingSlash: 'always', publicDir: './static',
  integrations: [UnoCSS({ injectReset: true })], devToolbar: { enabled: false },
})
