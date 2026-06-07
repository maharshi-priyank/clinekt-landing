/**
 * Prerenders the homepage (/) and writes dist/index.html.
 * Workaround for Vite 8/Rolldown treating index.html as a special entry
 * that @prerenderer/rollup-plugin can't overwrite via emitFile.
 */
import puppeteer from 'puppeteer'
import { preview } from 'vite'
import { copyFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../dist')

// Use any prerendered page as the SPA shell (vite preview needs dist/index.html)
copyFileSync(`${distDir}/security/index.html`, `${distDir}/index.html`)

const server = await preview({ preview: { port: 4177, strictPort: true } })

try {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto('http://localhost:4177/', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 3000))
  let html = await page.content()
  await browser.close()

  // Fix any localhost URLs left in HTML
  html = html.replace(/(https?:\/\/)?(localhost|127\.0\.0\.1):\d*/g, 'https://getclearwork.in')

  writeFileSync(`${distDir}/index.html`, html, 'utf-8')
  console.log('✓ dist/index.html prerendered (homepage)')
} finally {
  server.httpServer.close()
}
