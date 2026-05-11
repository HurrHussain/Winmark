import { lazy, Suspense, useEffect, useState } from "react"
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
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const TeamPage = lazy(() => import("@/pages/about/TeamPage").then(m => ({ default: m.TeamPage })))
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
 *   logoY:     scroll 0→450px  maps to  y 270→16px
 *              At 0px: logo sits 270px from top, visually centered over the hero card at 2.5 scale.
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

  // On mobile, the FlyingLogo is hidden entirely.
  // The Navbar's own mobile logo handles branding at all scroll positions.
  // This prevents the "two logos" clash on small screens.
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Scroll-driven flight values (desktop only)
  const logoY = useTransform(scrollY, [0, 550], [240, 6])
  const logoScale = useTransform(scrollY, [0, 450], [2.8, 0.85])

  // ── MOBILE: don't render the FlyingLogo at all ──
  if (isMobile) return null

  // ── SUBPAGES (desktop): static logo locked to its navbar resting position ──
  if (!isHomePage) {
    return (
      <motion.div
        key="subpage-logo"
        initial={{ y: 6, scale: 0.85 }}
        animate={{ y: isHidden ? -120 : 6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 flex justify-center"
        style={{
          scale: 0.85,
          transformOrigin: "top center",
          pointerEvents: "none",
        }}
      >
        <Link to="/" style={{ pointerEvents: "auto" }} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-sm">
          <img
            src="/logo-full.png"
            alt="Winmark Ingredients — Home"
            className="h-28 w-auto object-contain"
          />
        </Link>
      </motion.div>
    )
  }

  // ── HOMEPAGE (desktop): full scroll-driven flight ──
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
      <Link to="/" style={{ pointerEvents: "auto" }} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-sm inline-block">
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
                  <Route path="/about/team" element={<TeamPage />} />
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
