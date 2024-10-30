"use client"
import React, { useEffect, useState } from "react"
import {
  Disclosure,
} from "@headlessui/react"
import Logo from "./Logo"
import Link from "next/link"
import { cn } from "@/libs/utils"
import { LINKS } from "router.config"

const dropdownClasses =
  "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm  text-foreground hover:text-primary"

const dropdowncontentClasses =
  "dropdown-content absolute left-0 z-40 w-full origin-top-left hidden bg-background text-foreground transition-all"

const flyoutClasses = "grid grid-cols-3 2xl:px-56 px-40 pb-20 pt-10"

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false)

  // Handle scrolling to toggle the navbar's height
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolling(scrollPosition > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Disclosure as="nav" className={cn("navbar fixed inset-x-0 z-40 border-b bg-background")}>
      <div className="container px-2 sm:px-4 lg:px-8">
        <div
          className={cn(
            "flex justify-between transition-all duration-150",
            scrolling ? "h-16" : "h-[5.5rem]"
          )}
        >
          <div className="flex px-2 lg:px-0">
            {/*//+ Logo */}
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <Logo />
              </Link>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
              <Link href={LINKS.WISHLIST}>Wishlist</Link>
            </div>
            <div className="w-full max-w-lg lg:max-w-xs">
              <Link href={LINKS.CART}>Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
