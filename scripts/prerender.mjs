/**
 * Post-build prerender script.
 * Starts vite preview, visits every route with Puppeteer, saves static HTML.
 * On Vercel: uses @sparticuz/chromium (no system deps required).
 * Locally: uses puppeteer's bundled Chrome.
 */

import puppeteer from 'puppeteer'
import { preview } from 'vite'
import { mkdirSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../dist')
const PORT = 4177
const RENDER_DELAY_MS = 3000

const ROUTES = [
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
  '/privacy',
  '/terms',
  '/features',
  '/blog',
  '/blog/how-to-create-gst-invoice-india',
  '/blog/is-e-signature-legal-india',
  '/blog/tds-on-freelance-income-194j-194c-india',
  '/blog/how-to-write-freelance-contract-india',
  '/blog/old-vs-new-tax-regime-freelancer-india',
  '/blog/honeybook-alternative-india',
  '/blog/bonsai-alternative-india',
  '/blog/refrens-alternative-india',
  '/blog/honeybook-bonsai-dubsado-alternative-india',
  '/blog/best-freelancer-software-india-2026',
  '/blog/free-invoice-software-india',
  '/blog/free-client-management-software-india',
  '/blog/freelancer-billing-software-india',
  '/blog/how-to-manage-clients-freelancer-india',
  '/blog/bonsai-zoom-acquisition-india-alternative',
  '/blog/zoho-books-alternative-india-freelancers',
  '/blog/refrens-vs-clearwork',
]

// Resolve browser launch options — use @sparticuz/chromium on Vercel
// (its Chrome is statically linked and doesn't need system libs like libnspr4.so)
async function getBrowserOptions() {
  if (process.env.VERCEL) {
    const { default: chromium } = await import('@sparticuz/chromium')
    return {
      executablePath: await chromium.executablePath(),
      args: chromium.args,
      headless: chromium.headless,
    }
  }
  return {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
}

function routeToFilePath(route) {
  if (route === '/') return resolve(distDir, 'index.html')
  const parts = route.slice(1).split('/')
  const dir = resolve(distDir, ...parts)
  mkdirSync(dir, { recursive: true })
  return resolve(dir, 'index.html')
}

const server = await preview({ preview: { port: PORT, strictPort: true } })
const browserOptions = await getBrowserOptions()
const browser = await puppeteer.launch(browserOptions)

try {
  let done = 0
  for (const route of ROUTES) {
    const page = await browser.newPage()
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' })
    await new Promise(r => setTimeout(r, RENDER_DELAY_MS))
    let html = await page.content()
    await page.close()

    html = html.replace(/(https?:\/\/)?(localhost|127\.0\.0\.1):\d*/g, 'https://getclearwork.in')

    writeFileSync(routeToFilePath(route), html, 'utf-8')
    done++
    console.log(`✓ [${done}/${ROUTES.length}] ${route}`)
  }

  console.log(`\n✓ All ${ROUTES.length} routes prerendered successfully`)
} finally {
  await browser.close()
  server.httpServer.close()
}
