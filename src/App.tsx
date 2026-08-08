import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { trackPageview } from './lib/analytics'
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
const PricingPage                = lazy(() => import('./pages/Pricing'))
const ESignatureSoftwarePage     = lazy(() => import('./pages/ESignatureSoftware'))
const CrmForSmallBusinessPage    = lazy(() => import('./pages/CrmForSmallBusiness'))
const ContractManagementSoftwarePage = lazy(() => import('./pages/ContractManagementSoftware'))
const Privacy                    = lazy(() => import('./pages/Privacy'))
const Terms                      = lazy(() => import('./pages/Terms'))
const BlogIndex                  = lazy(() => import('./pages/blog/BlogIndex'))
const GstInvoiceGuide            = lazy(() => import('./pages/blog/GstInvoiceGuide'))
const ESignatureLegalIndia       = lazy(() => import('./pages/blog/ESignatureLegalIndia'))
const TdsGuide                   = lazy(() => import('./pages/blog/TdsGuide'))
const FreelanceContractGuide     = lazy(() => import('./pages/blog/FreelanceContractGuide'))
const TaxRegimeGuide               = lazy(() => import('./pages/blog/TaxRegimeGuide'))
const HoneyBookAlternativeIndia              = lazy(() => import('./pages/blog/HoneyBookAlternativeIndia'))
const BonsaiAlternativeIndia                 = lazy(() => import('./pages/blog/BonsaiAlternativeIndia'))
const RefrensAlternativeIndia                = lazy(() => import('./pages/blog/RefrensAlternativeIndia'))
const HoneyBookBonsaiDubsadoAlternativeIndia = lazy(() => import('./pages/blog/HoneyBookBonsaiDubsadoAlternativeIndia'))
const BestFreelancerSoftwareIndia2026        = lazy(() => import('./pages/blog/BestFreelancerSoftwareIndia2026'))
const FreeInvoiceSoftwareIndia               = lazy(() => import('./pages/blog/FreeInvoiceSoftwareIndia'))
const FreeClientManagementSoftwareIndia      = lazy(() => import('./pages/blog/FreeClientManagementSoftwareIndia'))
const FreelancerBillingSoftwareIndia         = lazy(() => import('./pages/blog/FreelancerBillingSoftwareIndia'))
const HowToManageClientsFreelancerIndia      = lazy(() => import('./pages/blog/HowToManageClientsFreelancerIndia'))
const BonsaiZoomAcquisitionIndiaAlternative  = lazy(() => import('./pages/blog/BonsaiZoomAcquisitionIndiaAlternative'))
const ZohoBookAlternativeIndiaFreelancers    = lazy(() => import('./pages/blog/ZohoBookAlternativeIndiaFreelancers'))
const RefrensVsClearwork                     = lazy(() => import('./pages/blog/RefrensVsClearwork'))
const FreelanceProposalGuideIndia            = lazy(() => import('./pages/blog/FreelanceProposalGuideIndia'))
const ClientFollowUpGuideIndia               = lazy(() => import('./pages/blog/ClientFollowUpGuideIndia'))
const GstFreelancersCompleteGuideIndia       = lazy(() => import('./pages/blog/GstFreelancersCompleteGuideIndia'))
const HowToGetFreelanceClientsIndia          = lazy(() => import('./pages/blog/HowToGetFreelanceClientsIndia'))
const RetainerVsProjectPricingIndia          = lazy(() => import('./pages/blog/RetainerVsProjectPricingIndia'))
const FreelanceInvoiceFormatIndia            = lazy(() => import('./pages/blog/FreelanceInvoiceFormatIndia'))
const GstNumberFormatExplained               = lazy(() => import('./pages/blog/GstNumberFormatExplained'))
const About                                  = lazy(() => import('./pages/About'))
const Contact                                = lazy(() => import('./pages/Contact'))

function RouteTracker() {
  const { pathname } = useLocation()
  useEffect(() => {
    trackPageview(pathname)
  }, [pathname])
  return null
}

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
      <RouteTracker />
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
            <Route path="/privacy"                             element={<Privacy />} />
            <Route path="/terms"                               element={<Terms />} />
            <Route path="/features"                            element={<FeaturesPage />} />
            <Route path="/pricing"                              element={<PricingPage />} />
            <Route path="/e-signature-software"                 element={<ESignatureSoftwarePage />} />
            <Route path="/crm-for-small-business"                element={<CrmForSmallBusinessPage />} />
            <Route path="/contract-management-software"          element={<ContractManagementSoftwarePage />} />
            <Route path="/blog"                                element={<BlogIndex />} />
            <Route path="/blog/how-to-create-gst-invoice-india"        element={<GstInvoiceGuide />} />
            <Route path="/blog/is-e-signature-legal-india"            element={<ESignatureLegalIndia />} />
            <Route path="/blog/tds-on-freelance-income-194j-194c-india" element={<TdsGuide />} />
            <Route path="/blog/how-to-write-freelance-contract-india"  element={<FreelanceContractGuide />} />
            <Route path="/blog/old-vs-new-tax-regime-freelancer-india" element={<TaxRegimeGuide />} />
            <Route path="/blog/honeybook-alternative-india"                      element={<HoneyBookAlternativeIndia />} />
            <Route path="/blog/bonsai-alternative-india"                       element={<BonsaiAlternativeIndia />} />
            <Route path="/blog/refrens-alternative-india"                      element={<RefrensAlternativeIndia />} />
            <Route path="/blog/honeybook-bonsai-dubsado-alternative-india"     element={<HoneyBookBonsaiDubsadoAlternativeIndia />} />
            <Route path="/blog/best-freelancer-software-india-2026"            element={<BestFreelancerSoftwareIndia2026 />} />
            <Route path="/blog/free-invoice-software-india"                   element={<FreeInvoiceSoftwareIndia />} />
            <Route path="/blog/free-client-management-software-india"         element={<FreeClientManagementSoftwareIndia />} />
            <Route path="/blog/freelancer-billing-software-india"             element={<FreelancerBillingSoftwareIndia />} />
            <Route path="/blog/how-to-manage-clients-freelancer-india"        element={<HowToManageClientsFreelancerIndia />} />
            <Route path="/blog/bonsai-zoom-acquisition-india-alternative"    element={<BonsaiZoomAcquisitionIndiaAlternative />} />
            <Route path="/blog/zoho-books-alternative-india-freelancers"     element={<ZohoBookAlternativeIndiaFreelancers />} />
            <Route path="/blog/refrens-vs-clearwork"                         element={<RefrensVsClearwork />} />
            <Route path="/blog/how-to-write-freelance-proposal-india"        element={<FreelanceProposalGuideIndia />} />
            <Route path="/blog/freelancer-client-follow-up-india"            element={<ClientFollowUpGuideIndia />} />
            <Route path="/blog/gst-for-freelancers-india-complete-guide"     element={<GstFreelancersCompleteGuideIndia />} />
            <Route path="/blog/how-to-get-freelance-clients-india"           element={<HowToGetFreelanceClientsIndia />} />
            <Route path="/blog/retainer-vs-project-pricing-agencies-india"   element={<RetainerVsProjectPricingIndia />} />
            <Route path="/blog/freelance-invoice-format-india"               element={<FreelanceInvoiceFormatIndia />} />
            <Route path="/blog/gst-number-format-explained"                  element={<GstNumberFormatExplained />} />
            <Route path="/about"                                             element={<About />} />
            <Route path="/contact"                                           element={<Contact />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
