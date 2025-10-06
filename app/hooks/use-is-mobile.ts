import { useState, useEffect } from "react"

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < breakpoint)
    
    checkDevice() // Check initially
    window.addEventListener('resize', checkDevice)
    
    return () => window.removeEventListener('resize', checkDevice)
  }, [breakpoint])

  return isMobile
}