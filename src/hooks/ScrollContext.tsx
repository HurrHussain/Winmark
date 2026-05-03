import { createContext, useContext, useEffect, type ReactNode } from "react"
import { useMotionValue, type MotionValue } from "framer-motion"

interface ScrollContextType {
  scrollY: MotionValue<number>
}

const ScrollCtx = createContext<ScrollContextType | null>(null)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollY = useMotionValue(0)

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY)
    // Set initial value
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [scrollY])

  return (
    <ScrollCtx.Provider value={{ scrollY }}>
      {children}
    </ScrollCtx.Provider>
  )
}

export function useScrollContext() {
  const ctx = useContext(ScrollCtx)
  if (!ctx) throw new Error("useScrollContext must be used within ScrollProvider")
  return ctx
}
