import { lazy, Suspense, useEffect } from "react"
import { HashRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom"
import { motion, useTransform } from "framer-motion"
import { Footer } from "@/components/sections/Footer"
import { Navbar } from "@/components/sections/Navbar"
import { ScrollProvider, useScrollContext } from "@/hooks/ScrollContext"
import { InquiryProvider } from "@/hooks/InquiryContext"
import { FloatingInquiryButton } from "@/components/products/FloatingInquiryButton"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"

import { useSmartHide } from "@/hooks/useSmartHide"

// Lazy load pages for better initial performance
const HomePage = lazy(() => import("@/pages/HomePage").then(m => ({ default: m.HomePage })))
const ServicesPage = lazy(() => import("@/pages/ServicesPage").then(m => ({ default: m.ServicesPage })))
const ProductsPage = lazy(() => import("@/pages/ProductsPage").then(m => ({ default: m.ProductsPage })))
const HistoryPage = lazy(() => import("@/pages/HistoryPage").then(m => ({ default: m.HistoryPage })))
const AboutPage = lazy(() => import("@/pages/AboutPage").then(m => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import("@/pages/ContactPage").then(m => ({ default: m.ContactPage })))

// Simple loading fallback
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center bg-white min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-[#1e535e]/20 border-t-[#1e535e] rounded-full animate-spin"></div>
  </div>
)

/**
 * FlyingLogo — Page-level fixed element. Belongs to neither Hero nor Navbar.
 *
 * THE MATH (Absolute Pixel Mapping):
 *   logoY:     scroll 0→450px  maps to  y 260→16px
 *              At 0px: logo sits 260px from top, visually centered over the hero card at 2.5 scale.
 *              At 450px: logo lands 16px from top, centered inside the navbar strip.
 *
 *   logoScale: scroll 0→450px  maps to  scale 2.5→0.9
 *              2.5x = dominant visual authority over the headline.
 *              0.9x = compact but balanced in the navbar.
 *
 * SPRING: Heavy spring (stiffness:50, damping:20, mass:1.2) wraps the raw transforms
 *         so the logo feels weighted and physical, not snappy.
 *
 * SUBPAGES: Static position at scale:0.9, y:16px — instant lock, no scroll dependency.
 * HOMEPAGE: Full continuous scroll-driven flight.
 * CLICKABLE: Wrapped in a Link to "/" so the logo doubles as a Home button on all pages.
 */
function FlyingLogo() {
  const { scrollY } = useScrollContext()
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const isHidden = useSmartHide()

  // CORRECTED MATH:
  //   y: 240 → 6px  — lowered starting position so it sits cleanly inside the hero card
  //   scale: 1.9 → 0.75 — larger in hero, but smaller to fit perfectly inside the 96px tall navbar
  // At 1.9x: logo height = 112*1.9 = 212px, bottom = 240+212 = 452px
  // Card content starts after spacer ≈ 456px — snug fit with no overlap
  const logoY = useTransform(scrollY, [0, 450], [240, 6])
  const logoScale = useTransform(scrollY, [0, 450], [1.9, 0.75])

  // ── SUBPAGES: static logo locked to its navbar resting position ──
  if (!isHomePage) {
    return (
      <motion.div
        key="subpage-logo"
        initial={{ y: 6, scale: 0.75 }}
        animate={{ y: isHidden ? -120 : 6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 flex justify-center"
        style={{
          scale: 0.75,
          transformOrigin: "top center",
          pointerEvents: "none",
        }}
      >
        <Link to="/" style={{ pointerEvents: "auto" }}>
          <img
            src="./logo-full.png"
            alt="Winmark Ingredients — Home"
            className="h-28 w-auto object-contain"
          />
        </Link>
        </motion.div>
    )
  }

  // ── HOMEPAGE: full scroll-driven flight ──
  // key="homepage-logo" forces a complete remount (resetting Framer Motion's
  // internal state) whenever we navigate back to the homepage, preventing
  // the logo from inheriting the subpage's animated position.
  return (
    <motion.div
      key="homepage-logo"
      style={{
        y: logoY,
        scale: logoScale,
        willChange: "transform",
      }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center origin-top pointer-events-none"
    >
      <Link to="/" style={{ pointerEvents: "auto" }}>
        <img
          src={`${import.meta.env.BASE_URL}logo-full.png`}
          alt="Winmark Ingredients — Home"
          className="h-28 w-auto object-contain drop-shadow-sm"
        />
      </Link>
    </motion.div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollProvider>
        <InquiryProvider>
          {/* FlyingLogo — page-level z-50 layer, owned by neither Hero nor Navbar */}
          <FlyingLogo />
          <ErrorBoundary fallbackMessage="The Inquiry List encountered an error. Please try clearing your selection.">
            <FloatingInquiryButton />
          </ErrorBoundary>
          <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </InquiryProvider>
      </ScrollProvider>
    </Router>
  )
}

export default App
