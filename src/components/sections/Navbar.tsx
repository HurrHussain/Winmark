import { useState, useEffect } from "react"
import { motion, AnimatePresence, useTransform } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useScrollContext } from "@/hooks/ScrollContext"

import { useSmartHide } from "@/hooks/useSmartHide"

type NavLink = { label: string; to: string; subItems?: { label: string; to: string }[] };

const leftLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
]

const rightLinks: NavLink[] = [
  { label: "History", to: "/history" },
  { 
    label: "About Us", 
    to: "/about",
    subItems: [
      { label: "Our Team", to: "/about/team" }
    ]
  },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
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
        className="fixed top-0 left-0 right-0 z-40 h-16 md:h-24 bg-white backdrop-blur-md border-b border-slate-100 pointer-events-none"
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-24 flex items-center">

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
                      "relative text-[15px] font-bold tracking-wide transition-colors duration-200 px-2 py-1 whitespace-nowrap",
                      isActive
                        ? "text-winmark"
                        : isSolid
                          ? "text-slate-700 hover:text-winmark"
                          : "text-white/90 hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className={cn(
                          "absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-winmark",
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
            <div className="w-[160px] md:w-[220px] h-[50px] md:h-[65px]" aria-hidden="true" />

            {/* Right group — flex-1 mirrors left, contact button pinned to the right */}
            <div className="flex items-center justify-end gap-6 flex-1">
              {rightLinks.map((link) => {
                const isActive = location.pathname === link.to
                const hasSubItems = link.subItems && link.subItems.length > 0
                const dropdownId = 'dropdown-' + link.label.replace(/\s+/g, '-').toLowerCase()

                return (
                  <div 
                    key={link.to} 
                    className="relative group"
                    onMouseEnter={() => hasSubItems && setActiveDropdown(link.label)}
                    onMouseLeave={() => hasSubItems && setActiveDropdown(null)}
                    onFocus={() => hasSubItems && setActiveDropdown(link.label)}
                    onBlur={() => hasSubItems && setActiveDropdown(null)}
                  >
                    <Link
                      to={link.to}
                      className={cn(
                        "relative text-[15px] font-bold tracking-wide transition-colors duration-200 px-2 py-1 flex items-center gap-1 whitespace-nowrap",
                        isActive
                          ? "text-winmark"
                          : isSolid
                            ? "text-slate-700 hover:text-winmark"
                            : "text-white/90 hover:text-white"
                      )}
                      aria-haspopup={hasSubItems ? "true" : undefined}
                      aria-expanded={hasSubItems ? (activeDropdown === link.label) : undefined}
                      onKeyDown={(e) => {
                        if (!hasSubItems) return
                        if (e.key === 'ArrowDown' || e.key === ' ' ) {
                          e.preventDefault()
                          setActiveDropdown(link.label)
                        }
                      }}
                    >
                      {link.label}
                      {hasSubItems && (
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          activeDropdown === link.label && "rotate-180"
                        )} />
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-winmark"
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

                    {/* Desktop Dropdown */}
                    {hasSubItems && (
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            id={dropdownId}
                            role="menu"
                            aria-label={`${link.label} submenu`}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-midnight-slate backdrop-blur-md border border-teal-500/20 rounded-xl overflow-hidden shadow-2xl z-50 py-2"
                          >
                            {link.subItems?.map((sub) => (
                              <Link
                                key={sub.to}
                                to={sub.to}
                                role="menuitem"
                                tabIndex={0}
                                className="block px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-teal-500/10 transition-colors"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                )
              })}

              <Link
                to="/contact"
                className={cn(
                  "ml-2 text-[15px] font-bold tracking-wide px-6 py-2.5 rounded-full transition-colors duration-200 whitespace-nowrap",
                  location.pathname === "/contact"
                    ? "bg-winmark-dark text-white shadow-md"
                    : "bg-winmark text-white hover:bg-winmark-dark hover:shadow-md active:scale-95"
                )}
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* ── Mobile: Logo left + hamburger right ── */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Mobile logo — always visible. Uses brightness filter for contrast on transparent nav */}
            <Link to="/" className="flex items-center">
              <img
                src={`${import.meta.env.BASE_URL}logo-full.png`}
                alt="Winmark Ingredients"
                className="h-9 w-auto object-contain transition-all duration-300"
                style={{
                  filter: isSolid ? 'none' : 'brightness(0) invert(1)',
                }}
              />
            </Link>

            <button
              className={cn("p-3 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center", isSolid ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10")}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              className="md:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 relative"
              style={{ maxHeight: 'calc(100dvh - 4rem)', overflowY: 'auto' }}
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {[...leftLinks, ...rightLinks].map((link) => {
                  const isActive = location.pathname === link.to
                  const hasSubItems = link.subItems && link.subItems.length > 0
                  const isDropdownOpen = activeDropdown === link.label

                  return (
                    <div key={link.to} className="flex flex-col">
                      <div className="flex items-center justify-between w-full">
                        <Link
                          to={link.to}
                          onClick={() => setMenuOpen(false)}
                          className={cn(
                            "flex-1 relative text-base font-semibold transition-all px-4 py-3.5 rounded-md min-h-[48px] flex items-center",
                            isActive
                              ? "text-white shadow-sm"
                              : "text-slate-600 hover:text-winmark hover:bg-slate-50"
                          )}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="mobile-nav-pill"
                              className="absolute inset-0 bg-winmark rounded-md -z-10"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                          {link.label}
                        </Link>
                        
                        {hasSubItems && (
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === link.label ? null : link.label)
                            }}
                            className="p-3 text-slate-400 hover:text-winmark min-h-[48px] min-w-[48px] flex items-center justify-center"
                          >
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isDropdownOpen && "rotate-180")} />
                          </button>
                        )}
                      </div>

                      {hasSubItems && (
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden bg-slate-50/50 rounded-lg mx-2 mb-2"
                            >
                              {link.subItems?.map((sub) => (
                                <Link
                                  key={sub.to}
                                  to={sub.to}
                                  onClick={() => setMenuOpen(false)}
                                  className="block px-8 py-2 text-sm font-medium text-slate-500 hover:text-winmark transition-colors"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  )
                })}
                <Link
                  to="/contact"
                  onClick={() => {
                    setMenuOpen(false)
                    document.body.style.overflow = 'unset'
                  }}
                  className={cn(
                    "mt-3 text-base font-semibold text-center px-4 py-3.5 rounded-full transition-all min-h-[48px] flex items-center justify-center",
                    location.pathname === "/contact"
                      ? "bg-winmark-dark text-white shadow-md"
                      : "bg-winmark text-white hover:bg-winmark-dark"
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
