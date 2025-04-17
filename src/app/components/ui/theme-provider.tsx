"use client"

import { useEffect, type ReactNode } from "react"

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  return <>{children}</>
}
