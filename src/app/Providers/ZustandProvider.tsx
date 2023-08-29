'use client'

import { useEffect, useState } from "react"

const HydrationZustand = ({ children }: {
	children: React.ReactNode
}) => {
  const [isHydrated, setIsHydrated] = useState(true)

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(false)
	}, [])

	if (isHydrated) return null;

	return <>{children}</>
}

export default HydrationZustand
