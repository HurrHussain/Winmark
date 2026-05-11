import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ShoppingCart, X, Download } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useInquiry } from "@/hooks/InquiryContext"
import * as XLSX from "xlsx"
import { productsData } from "@/data/products"
import { cn } from "@/lib/utils"

export function FloatingInquiryButton() {
  const { items, removeItem, clearItems } = useInquiry()
  const navigate = useNavigate()
  const count = items.length
  const [renderError, setRenderError] = useState<Error | null>(null)

  // Throw error in render so ErrorBoundary catches it
  if (renderError) throw renderError

  const handleEnquire = () => {
    // Build the message with numbered list
    const message = `I am interested in receiving a quote for the following items:\n${items.map((item, i) => `${i + 1}. ${item}`).join("\n")}`

    // Encode into URL params so it persists on refresh
    const params = new URLSearchParams()
    params.set("items", JSON.stringify(items))
    params.set("message", message)

    navigate(`/contact?${params.toString()}`)
  }

  const generateDynamicExcel = () => {
    try {
      if (items.length === 0) return

      const sanitizeExcelCell = (value: string) => {
        if (value && /^[=+\-@]/.test(value)) {
          return "'" + value;
        }
        return value;
      };

      // Map items to get category from productsData
      const excelData = items.map(itemName => {
        const product = productsData.find(p => p.name === itemName)
        return {
          "Item Name": sanitizeExcelCell(itemName),
          "Category": sanitizeExcelCell(product ? product.category : "Unknown"),
          "Inquiry Date": new Date().toLocaleDateString()
        }
      })

      // Create a new workbook and worksheet
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet([])

      // Add title row
      XLSX.utils.sheet_add_aoa(ws, [["Winmark Ingredients - Custom Inquiry List"]], { origin: "A1" })
      
      // Add data starting from row 3 (leaving row 2 blank)
      XLSX.utils.sheet_add_json(ws, excelData, { origin: "A3", skipHeader: false })

      // Formatting: Make title bold (Requires sheetjs-style or similar for actual style, basic xlsx doesn't support styles well in community edition, but we can structure it nicely)
      ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }] // Merge title cells

      // Append worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, "Inquiry List")

      // Generate filename
      const dateStr = new Date().toISOString().split('T')[0]
      const fileName = `Winmark_Inquiry_${dateStr}.xlsx`

      // Trigger download
      XLSX.writeFile(wb, fileName)
    } catch (error) {
      // Catch any xlsx or data corruption errors and pass to ErrorBoundary
      setRenderError(error instanceof Error ? error : new Error("Failed to generate Excel file"))
    }
  }

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed right-3 sm:right-6 bottom-20 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-[60] flex flex-col items-end gap-2 sm:gap-3 max-w-[calc(100vw-1.5rem)] sm:max-w-none"
        >
          {/* Item pills — mini list */}
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl p-3 sm:p-4 max-h-[200px] sm:max-h-[300px] overflow-y-auto shadow-2xl w-56 sm:w-64">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Inquiry List
              </span>
              <button
                onClick={clearItems}
                className="text-[10px] font-bold uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-sm"
              >
                Clear All
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between gap-2 bg-white/5 rounded-lg px-3 py-2 group"
                >
                  <span className="text-xs text-slate-300 font-medium truncate flex-1">
                    {item}
                  </span>
                  <button
                    onClick={() => removeItem(item)}
                    aria-label={`Remove ${item} from inquiry list`}
                    title={`Remove ${item}`}
                    className="text-slate-500 hover:text-red-400 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-sm"
                  >
                    <X size={12} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 w-full">
            {/* Main Enquire Button */}
            <motion.button
              onClick={handleEnquire}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 sm:gap-3 bg-teal-600 hover:bg-teal-500 text-white font-black uppercase text-[10px] sm:text-xs tracking-widest px-4 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl shadow-teal-900/40 transition-colors justify-center w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              <ShoppingCart size={16} />
              Enquire
              <span className="bg-white text-teal-700 font-black text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {count}
              </span>
              <ArrowRight size={14} />
            </motion.button>

            {/* Dynamic Excel Download Button */}
            <motion.button
              onClick={generateDynamicExcel}
              disabled={count === 0}
              whileHover={count > 0 ? { scale: 1.05 } : {}}
              whileTap={count > 0 ? { scale: 0.95 } : {}}
              title={count === 0 ? "Add items to generate a custom list." : "Download Inquiry as Excel"}
              className={cn(
                "flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest px-4 py-3 rounded-full transition-colors justify-center w-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                count > 0 
                  ? "bg-[#1e293b] text-teal-400 border-teal-500/50 hover:bg-slate-800 hover:border-teal-400 cursor-pointer shadow-lg" 
                  : "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed"
              )}
            >
              <Download size={14} />
              Download Excel (.xlsx)
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
