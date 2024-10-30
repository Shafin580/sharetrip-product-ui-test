"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { useTheme } from "next-themes"
import { Button } from "@shad/button"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        if (theme == "light") {
          setTheme("dark")
        } else {
          setTheme("light")
        }
      }}
    >
      {/* {theme == "light" ? <SunIcon /> : <MoonIcon />} */}
      {/* <span className="scale-100 dark:scale-0">LT</span>
      <span className="absolute scale-0 dark:scale-100">DK</span> */}
      <SunIcon className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
