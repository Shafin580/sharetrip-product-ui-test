"use client"

import { cn } from "@/libs/utils"
import ButtonIcon from "@library/ButtonIcon"
import { Heart, Trash2, Plus, Eye } from "lucide-react"
import { Card } from "@shad/card"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fallbackImage } from "services/api/api"
import { Button } from "@shad/button"

interface CardProductProps {
  id?: string
  title?: string
  productImage?: string
  authorName?: string
  className?: string
  href?: string
}

export default function CardProduct({
  title = "Product Name",
  productImage = "/img/slide1.png",
  authorName = "Author Name",
  className = "",
  href = "#",
  id,
}: CardProductProps) {
  const [productImageSrc, setProductImageSrc] = useState<string>("")

  useEffect(() => {
    setProductImageSrc(productImage)
  }, [productImage])
  return (
    <>
      <Link href={href} className={cn("group/card product-card", className)}>
      <Card className="max-w-sm mx-auto overflow-hidden">
      <div className="relative">
        {/* Product Image with Discount Badge and Wishlist */}
        <div className="relative aspect-[3/4] w-full">
          <div className="absolute left-0 top-0 z-10 rounded-br bg-orange-500 px-2 py-1 text-sm font-medium text-white">
            ₹200
          </div>
          <button className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 text-gray-900 shadow-sm hover:bg-gray-100">
            <Heart className="h-5 w-5" />
          </button>
          <Image
            alt="Fabrilife Mens Premium Designer T-Shirt"
            className="object-cover"
            height={400}
            width={300}
            src="/placeholder.svg"
          />
        </div>

        {/* Cart Status Bar */}
        <div className="flex items-center justify-between bg-green-500 px-3 py-2 text-white">
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            <span className="text-sm">1 Added in Cart</span>
          </div>
          <Button size="icon" variant="ghost" className="h-6 w-6 text-white hover:bg-green-600">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick View Button */}
        <Button
          variant="secondary"
          className="flex w-full items-center justify-center gap-2 rounded-none border-t"
        >
          <Eye className="h-4 w-4" />
          Quick View
        </Button>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-1">
        <div className="text-sm text-muted-foreground">Fabrilife</div>
        <h3 className="text-sm font-medium truncate">
          Fabrilife Mens Premium Designer Edition T Shirt
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-medium">₹2,500</span>
          <span className="text-sm text-muted-foreground line-through">₹2,500</span>
        </div>
      </div>
    </Card>
      </Link>
    </>
  )
}
