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
    <footer
      id="contact"
      className="text-slate-200 relative bg-[var(--midnight-slate)]"
    >
      {/* Main footer grid */}
      <div className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start gap-4 mb-8">
              <img
                src={`${import.meta.env.BASE_URL}logo-full.png`}
                alt="Winmark Logo"
                className="h-20 md:h-26 w-auto object-contain object-left"
              />
              <span className="text-[10px] font-bold tracking-[0.4em] text-white 500 uppercase">Winmark Ingredients Pvt Ltd</span>
            </div>
            <p className="text-sm text-slate-400 leading-[1.8] mb-8 font-medium">
              Premier sourcing and distribution of industrial food ingredients for Pakistan's leading manufacturers. Engineering resilient supply chains since 2001.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:pl-12">
            <h4 className="text-xs font-black tracking-[0.2em] uppercase text-white mb-8">
              Navigation
            </h4>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-teal-400 transition-all duration-300 font-bold uppercase tracking-widest"
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
              <h4 className="text-xs font-black tracking-[0.2em] uppercase text-white mb-8">
                {w.city} HUB
              </h4>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                    <MapPin className="w-4 h-4 text-teal-500" />
                  </div>
                  <a
                    href={w.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col group-hover:translate-x-1 transition-transform"
                  >
                    <p className="text-sm text-slate-300 font-bold group-hover:text-white transition-colors">{w.address}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{w.detail}</p>
                  </a>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                    <Phone className="w-4 h-4 text-teal-500" />
                  </div>
                  <a
                    href={`tel:${w.phone.replace(/\s+/g, '')}`}
                    className="text-sm text-slate-300 font-bold group-hover:text-white transition-colors"
                  >
                    {w.phone}
                  </a>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                    <Mail className="w-4 h-4 text-teal-500" />
                  </div>
                  <a
                    href="mailto:info@winmarkingredients.com"
                    className="text-sm text-slate-300 font-bold group-hover:text-white transition-colors"
                  >
                    info@winmarkingredients.com
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thin Horizontal Rule */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px w-full bg-white opacity-10" />
      </div>

      {/* Bottom bar */}
      <div className="py-10 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            © {CURRENT_YEAR} Winmark Ingredients Pvt. Ltd.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Karachi</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-900">/</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Lahore</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-900">/</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
