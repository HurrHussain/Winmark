import { createContext, useContext, useEffect, type ReactNode } from "react"
import { useMotionValue, type MotionValue } from "framer-motion"
import { useLocation } from "react-router-dom"

interface ScrollContextType {
  scrollY: MotionValue<number>
}

const ScrollCtx = createContext<ScrollContextType | null>(null)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollY = useMotionValue(typeof window !== "undefined" ? window.scrollY : 0)
  const { pathname } = useLocation()

  // Sync MotionValue with page top on route change ONLY if we are actually at the top
  // to prevent "ghost" scroll positions causing animation jumps.
  useEffect(() => {
    // If we're on the homepage, we usually want to start at 0, 
    // but if it's a refresh, we should respect the browser's position.
    // The key is to ensure the MotionValue matches the DOM.
    scrollY.set(window.scrollY)
  }, [pathname, scrollY])

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY)
    
    // Set initial value in case it changed between mount and effect
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
