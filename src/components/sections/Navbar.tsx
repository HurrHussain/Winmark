import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "History", to: "/history" },
  { label: "Clients", to: "/clients" },
  { label: "Contact", to: "/contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const isSolid = scrolled || !isHomePage

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isSolid
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group relative">
          <img
            src="/logo-full.png"
            alt="Winmark Logo"
            className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 relative z-10"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-sm font-semibold tracking-wide transition-all duration-200 px-3 py-1.5 rounded-md",
                  isActive
                    ? "bg-[#1e535e] text-white shadow-sm"
                    : (isSolid ? "text-slate-600 hover:text-[#1e535e]" : "text-white/80 hover:text-white")
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>



        {/* Mobile hamburger */}
        <button
          className={cn("md:hidden", isSolid ? "text-slate-900" : "text-white")}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-sm font-semibold transition-all px-3 py-2 rounded-md",
                      isActive
                        ? "bg-[#1e535e] text-white shadow-sm"
                        : "text-slate-600 hover:text-[#1e535e] hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}

            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
