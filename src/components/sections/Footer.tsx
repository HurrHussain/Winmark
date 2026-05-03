import { motion } from "framer-motion"
import { MapPin, Phone, Mail } from "lucide-react"
import { Link } from "react-router-dom"

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "History", to: "/history" },
  { label: "About Us", to: "/about" },
]

const warehouses = [
  {
    city: "Karachi",
    address: "Industrial Area, SITE, Karachi",
    detail: "Main Warehouse & Head Office",
    phone: "+92 320 2890846",
    mapLink: "https://maps.app.goo.gl/s5zSQwhpC5kNZSUR6",
  },
  {
    city: "Lahore",
    address: "Industrial Zone, Lahore",
    detail: "North Region Distribution Hub",
    phone: "+92 320 2890846",
    mapLink: "https://maps.app.goo.gl/2k6Yogq7S3XJUxks7",
  },
]

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: "#1e535e" }}>
      {/* Top band — contact email feature */}
      <div className="border-b border-white/10 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 mb-2">
              Get In Touch
            </p>
            <a
              href="mailto:info@winmarkingredients.com"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white hover:text-white/80 transition-colors tracking-tight break-all"
            >
              info@winmarkingredients.com
            </a>
          </motion.div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start gap-4 mb-4">
              <img
                src="/logo-full.png"
                alt="Winmark Logo"
                className="h-20 md:h-24 w-auto object-contain object-left brightness-0 invert"
              />
              <span className="font-bold text-lg tracking-wide text-white uppercase">WINMARK INGREDIENTS PVT LTD</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Premier sourcing and distribution of food ingredients for Pakistan's leading manufacturers since 2001.
            </p>
            <p className="text-xs text-white/40 tracking-widest uppercase">
              Winmark Ingredients Pvt. Ltd.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white/50 mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 hover:text-white transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Warehouses */}
          {warehouses.map((w) => (
            <div key={w.city}>
              <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white/50 mb-5">
                {w.city} Office
              </h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 group">
                  <MapPin className="w-4 h-4 text-white/40 mt-0.5 shrink-0 group-hover:text-white/70 transition-colors" />
                  <a href={w.mapLink} target="_blank" rel="noopener noreferrer" className="flex-col">
                    <p className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">{w.address}</p>
                    <p className="text-xs text-white/40 mt-0.5">{w.detail}</p>
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-white/40 shrink-0" />
                  <a href={`tel:${w.phone}`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {w.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-white/40 shrink-0" />
                  <a href="mailto:info@winmarkingredients.com" className="text-sm text-white/70 hover:text-white transition-colors">
                    info@winmarkingredients.com
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © {CURRENT_YEAR} Winmark Ingredients Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-white/35">
            Karachi · Lahore · Pakistan
          </p>
        </div>
      </div>
    </footer>
  )
}
