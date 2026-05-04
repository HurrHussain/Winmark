import { useState, useEffect } from "react"
import { motion, AnimatePresence, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useScrollContext } from "@/hooks/ScrollContext"

import { useSmartHide } from "@/hooks/useSmartHide"

const leftLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
]

const rightLinks = [
  { label: "History", to: "/history" },
  { label: "About Us", to: "/about" },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  // Initialize as solid immediately on subpages — avoids a one-frame flash
  const [isSolid, setIsSolid] = useState(!isHomePage)
  const { scrollY } = useScrollContext()
  const isHidden = useSmartHide()

  // Navbar bg: smooth opacity from 0→1 over scroll 300→450px.
  // Matches the window where the flying logo is landing and the hero card is gone.
  const navBgOpacity = useTransform(scrollY, [300, 450], [0, 1])

  // isSolid drives link colors (needs a boolean).
  // Threshold at 300px aligns with when the nav bg starts appearing.
  useEffect(() => {
    if (!isHomePage) {
      setIsSolid(true)
      return
    }
    const unsubscribe = scrollY.on("change", (y) => {
      setIsSolid(y > 300)
    })
    setIsSolid(scrollY.get() > 300)
    return unsubscribe
  }, [scrollY, isHomePage])

  // Hide logic: ONLY on subpages and only if the menu is NOT open
  // We force false on homepage to prevent any navigation glitches
  const shouldHide = !isHomePage && isHidden && !menuOpen

  return (
    <>
      {/* Navbar background:
          - Homepage: fades in smoothly via MotionValue as the logo lands (scroll 300→450px)
          - Subpages: always solid white, no scroll dependency, no flicker */}
      <motion.div
        animate={{ y: shouldHide ? -120 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ opacity: isHomePage ? navBgOpacity : 1 }}
        className="fixed top-0 left-0 right-0 z-40 h-20 md:h-24 bg-white backdrop-blur-md border-b border-slate-100 pointer-events-none"
      />

      <motion.header
        initial={false}
        animate={{ 
          y: shouldHide ? -120 : 0,
          opacity: 1 
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-20 md:h-24 flex items-center">

          {/* ── Desktop: 3-column split nav ── */}
          <nav className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center w-full gap-8">

            {/* Left group — flex-1 keeps the center logo slot mathematically centered */}
            <div className="flex items-center gap-6 flex-1">
              {leftLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "relative text-[15px] font-bold tracking-wide transition-colors duration-200 px-2 py-1",
                      isActive
                        ? "text-[#1e535e]"
                        : isSolid
                          ? "text-slate-700 hover:text-[#1e535e]"
                          : "text-white/90 hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className={cn(
                          "absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#1e535e]",
                          !isSolid && !isHomePage && "bg-white"
                        )}
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 38,
                          mass: 1,
                          restDelta: 0.001
                        }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Center dead zone — visual target for the Flying Logo.
              This slot is intentionally empty; the logo belongs to the page, not the nav. */}
            <div className="w-[220px] h-[65px]" aria-hidden="true" />

            {/* Right group — flex-1 mirrors left, contact button pinned to the right */}
            <div className="flex items-center justify-end gap-6 flex-1">
              {rightLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "relative text-[15px] font-bold tracking-wide transition-colors duration-200 px-2 py-1",
                      isActive
                        ? "text-[#1e535e]"
                        : isSolid
                          ? "text-slate-700 hover:text-[#1e535e]"
                          : "text-white/90 hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#1e535e]"
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 38,
                          mass: 1,
                          restDelta: 0.001
                        }}
                      />
                    )}
                  </Link>
                )
              })}

              <Link
                to="/contact"
                className={cn(
                  "ml-2 text-[15px] font-bold tracking-wide px-6 py-2.5 rounded-full transition-colors duration-200",
                  location.pathname === "/contact"
                    ? "bg-[#163f47] text-white shadow-md"
                    : "bg-[#1e535e] text-white hover:bg-[#163f47] hover:shadow-md active:scale-95"
                )}
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* ── Mobile: Logo left + hamburger right ── */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* On mobile the logo slot shows the actual image when solid */}
            <Link to="/" className="flex items-center">
              <AnimatePresence>
                {isSolid && (
                  <motion.img
                    key="mobile-logo"
                    src={`${import.meta.env.BASE_URL}logo-full.png`}
                    alt="Winmark Ingredients"
                    className="h-8 w-auto object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </Link>

            <button
              className={cn("p-2 rounded-md transition-colors", isSolid ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10")}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 relative"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {[...leftLinks, ...rightLinks].map((link) => {
                  const isActive = location.pathname === link.to
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "relative text-sm font-semibold transition-all px-4 py-2.5 rounded-md",
                        isActive
                          ? "text-white shadow-sm"
                          : "text-slate-600 hover:text-[#1e535e] hover:bg-slate-50"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobile-nav-pill"
                          className="absolute inset-0 bg-[#1e535e] rounded-md -z-10"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      {link.label}
                    </Link>
                  )
                })}
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "mt-2 text-sm font-semibold text-center px-4 py-2.5 rounded-full transition-all",
                    location.pathname === "/contact"
                      ? "bg-[#163f47] text-white shadow-md"
                      : "bg-[#1e535e] text-white hover:bg-[#163f47]"
                  )}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
