import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ScrollToTop from './components/ScrollToTop'

const GstInvoiceGenerator        = lazy(() => import('./pages/tools/GstInvoiceGenerator'))
const GstCalculator              = lazy(() => import('./pages/tools/GstCalculator'))
const TdsCalculator              = lazy(() => import('./pages/tools/TdsCalculator'))
const HourlyRateCalculator       = lazy(() => import('./pages/tools/HourlyRateCalculator'))
const IncomeTaxCalculator        = lazy(() => import('./pages/tools/IncomeTaxCalculator'))
const FreelanceContractGenerator = lazy(() => import('./pages/tools/FreelanceContractGenerator'))
const QuoteGenerator             = lazy(() => import('./pages/tools/QuoteGenerator'))
const InvoiceNumberGenerator     = lazy(() => import('./pages/tools/InvoiceNumberGenerator'))
const ToolsIndex                 = lazy(() => import('./pages/ToolsIndex'))
const Security                   = lazy(() => import('./pages/Security'))
const FeaturesPage               = lazy(() => import('./pages/Features'))
const BlogIndex                  = lazy(() => import('./pages/blog/BlogIndex'))
const GstInvoiceGuide            = lazy(() => import('./pages/blog/GstInvoiceGuide'))
const ESignatureLegalIndia       = lazy(() => import('./pages/blog/ESignatureLegalIndia'))
const TdsGuide                   = lazy(() => import('./pages/blog/TdsGuide'))
const FreelanceContractGuide     = lazy(() => import('./pages/blog/FreelanceContractGuide'))
const TaxRegimeGuide             = lazy(() => import('./pages/blog/TaxRegimeGuide'))

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-16">
      <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin" />
    </div>
  )
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    let raf: number
    function loop(time: number) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-white min-h-screen">
        <Navbar />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/"                              element={<Home />} />
            <Route path="/tools/gst-invoice-generator"   element={<GstInvoiceGenerator />} />
            <Route path="/tools/gst-calculator"          element={<GstCalculator />} />
            <Route path="/tools/tds-calculator"          element={<TdsCalculator />} />
            <Route path="/tools/hourly-rate-calculator"  element={<HourlyRateCalculator />} />
            <Route path="/tools/income-tax-calculator"         element={<IncomeTaxCalculator />} />
            <Route path="/tools/freelance-contract-generator"  element={<FreelanceContractGenerator />} />
            <Route path="/tools/quote-generator"               element={<QuoteGenerator />} />
            <Route path="/tools/invoice-number-generator"      element={<InvoiceNumberGenerator />} />
            <Route path="/tools"                               element={<ToolsIndex />} />
            <Route path="/security"                            element={<Security />} />
            <Route path="/features"                            element={<FeaturesPage />} />
            <Route path="/blog"                                element={<BlogIndex />} />
            <Route path="/blog/how-to-create-gst-invoice-india"        element={<GstInvoiceGuide />} />
            <Route path="/blog/is-e-signature-legal-india"            element={<ESignatureLegalIndia />} />
            <Route path="/blog/tds-on-freelance-income-194j-194c-india" element={<TdsGuide />} />
            <Route path="/blog/how-to-write-freelance-contract-india"  element={<FreelanceContractGuide />} />
            <Route path="/blog/old-vs-new-tax-regime-freelancer-india" element={<TaxRegimeGuide />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
