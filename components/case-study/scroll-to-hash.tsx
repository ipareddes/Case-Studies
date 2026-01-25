'use client'

import { useEffect } from 'react'

/**
 * Client component that handles scrolling to hash on initial page load
 */
export function ScrollToHash() {
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash

    if (hash) {
      // Remove the # from the hash
      const id = hash.slice(1)

      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          // Scroll to element with offset for header
          const offset = window.innerWidth < 1024 ? 180 : 120
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset

          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }, [])

  return null
}
