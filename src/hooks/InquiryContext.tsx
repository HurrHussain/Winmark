import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface InquiryContextType {
  items: string[]
  addItem: (name: string) => void
  removeItem: (name: string) => void
  hasItem: (name: string) => boolean
  clearItems: () => void
}

const InquiryCtx = createContext<InquiryContextType | null>(null)

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([])

  const addItem = useCallback((name: string) => {
    setItems(prev => prev.includes(name) ? prev : [...prev, name])
  }, [])

  const removeItem = useCallback((name: string) => {
    setItems(prev => prev.filter(n => n !== name))
  }, [])

  const hasItem = useCallback((name: string) => {
    return items.includes(name)
  }, [items])

  const clearItems = useCallback(() => {
    setItems([])
  }, [])

  return (
    <InquiryCtx.Provider value={{ items, addItem, removeItem, hasItem, clearItems }}>
      {children}
    </InquiryCtx.Provider>
  )
}

export function useInquiry() {
  const ctx = useContext(InquiryCtx)
  if (!ctx) throw new Error("useInquiry must be used within InquiryProvider")
  return ctx
}
