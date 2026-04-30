import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"

const products = [
  {
    title: "Confectionery",
    subtitle: "Cocoa Products, Couvertures & Compound Slab",
    description:
      "Premium Dutch-process cocoa powders, cocoa butter, and compound chocolate blocks for confectionery and bakery applications.",
    image: "/product-cocoa.webp",
  },
  {
    title: "Dairy",
    subtitle: "Milk Powders, Desi Ghee & AMF",
    description:
      "High-grade skimmed milk powder (SMP) and full cream milk powder (FCMP) sourced from certified dairy processors.",
    image: "/product-milk.webp",
  },
  {
    title: "Bakery",
    subtitle: "Specialized Fats, Shortening & Margarine",
    description:
      "IFFCO-grade specialty fats, desi ghee, vegetable shortening, and fractionated palm olein for industrial baking.",
    image: "/product-oils.webp",
  },
  {
    title: "Beverages",
    subtitle: "Tea Whitener, Emulsifiers & Stabilizers",
    description:
      "Functional stabilizers and emulsifiers to optimize texture, shelf life, and taste in beverage formulations.",
    image: "/product-emulsifiers.webp",
  },
]

export function Products() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="products" className="bg-white py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#1e535e]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1e535e]">
              Portfolio
            </span>
            <div className="h-px w-8 bg-[#1e535e]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Our Products
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
            A curated portfolio of high-quality ingredients sourced from global suppliers, delivered to Pakistan's leading food manufacturers.
          </p>
        </motion.div>

        {/* Product cards */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Background image */}
              <img
                src={product.image}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white leading-tight mb-1">
                  {product.title}
                </h3>
                <p className="text-white/80 text-xs font-medium tracking-wide">
                  {product.subtitle}
                </p>

                {/* Description — slides up on hover */}
                <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-400 ease-out mt-3">
                  <p className="text-white/80 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-teal-600/20 group"
          >
            <span>Explore Full Catalog</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
