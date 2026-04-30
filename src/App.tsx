import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Footer } from "@/components/sections/Footer"
import { Navbar } from "@/components/sections/Navbar"

// Lazy load pages for better initial performance
const HomePage = lazy(() => import("@/pages/HomePage").then(m => ({ default: m.HomePage })))
const ServicesPage = lazy(() => import("@/pages/ServicesPage").then(m => ({ default: m.ServicesPage })))
const ProductsPage = lazy(() => import("@/pages/ProductsPage").then(m => ({ default: m.ProductsPage })))
const HistoryPage = lazy(() => import("@/pages/HistoryPage").then(m => ({ default: m.HistoryPage })))
const LegacyHistoryPage = lazy(() => import("@/pages/LegacyHistory").then(m => ({ default: m.LegacyHistoryPage })))
const ClientsPage = lazy(() => import("@/pages/ClientsPage").then(m => ({ default: m.ClientsPage })))
const ContactPage = lazy(() => import("@/pages/ContactPage").then(m => ({ default: m.ContactPage })))

// Simple loading fallback
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center bg-white min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-[#1e535e]/20 border-t-[#1e535e] rounded-full animate-spin"></div>
  </div>
)

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/legacy-history" element={<LegacyHistoryPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
