"use client"

import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LINKS } from "router.config"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Navbar() {
  const [cartItemCount, setCartItemCount] = useState(15)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ease-in-out ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link href={LINKS.HOME} className="text-2xl font-bold text-gray-800">
              <Image
                src="/img/test-logo.png"
                alt="Sharetrip Product Add to Cart App"
                width={150}
                height={150}
              />
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href={LINKS.WISHLIST}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              <Heart className="mr-1 inline-block h-5 w-5" />
              Wishlist
            </Link>
            <div className="relative ml-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => {
                  router.push(LINKS.CART)
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {cartItemCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
