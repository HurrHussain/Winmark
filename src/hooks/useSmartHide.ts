import { useState, useRef, useEffect } from "react"
import { useScrollContext } from "@/hooks/ScrollContext"
import { useLocation } from "react-router-dom"

/**
 * useSmartHide — Smartly hides elements on scroll down and reveals them on scroll up.
 * Logic is disabled on the Homepage to allow the FlyingLogo flight to function normally.
 */
export function useSmartHide() {
  const { scrollY } = useScrollContext()
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    // We never hide on the homepage because the navbar is either transparent 
    // or the logo is in flight.
    if (isHomePage) {
      setHidden(false)
      return
    }

    const unsubscribe = scrollY.on("change", (y) => {
      // Sensitivity threshold: only hide after scrolling down 150px
      // Reveal instantly on any upward scroll
      if (y > lastScrollY.current && y > 150) {
        setHidden(true)
      } else if (y < lastScrollY.current) {
        setHidden(false)
      }
      lastScrollY.current = y
    })
    
    return () => {
      unsubscribe()
      // Reset state on unmount or route change
      setHidden(false)
    }
  }, [scrollY, isHomePage])

  return hidden
}
