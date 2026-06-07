import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'

const PRERENDER_ROUTES = [
  '/',
  '/tools',
  '/tools/gst-invoice-generator',
  '/tools/gst-calculator',
  '/tools/tds-calculator',
  '/tools/hourly-rate-calculator',
  '/tools/income-tax-calculator',
  '/tools/freelance-contract-generator',
  '/tools/quote-generator',
  '/tools/invoice-number-generator',
  '/security',
  '/features',
]

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: PRERENDER_ROUTES,
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterTime: 3000,
      },
      postProcess(context) {
        // Replace any localhost URLs left in HTML with the live domain
        context.html = context.html.replace(
          /(https?:\/\/)?(localhost|127\.0\.0\.1):\d*/g,
          'https://getclearwork.in',
        )
      },
    }),
  ],
})
