"use client"

import { cn } from "@/libs/utils"
import { Card } from "@shad/card"
import { StarIcon } from "@heroicons/react/20/solid"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fallbackImage } from "services/api/api"

interface CardSellerProps {
  id?: string
  sellerName?: string
  sellerImg?: string
  className?: string
  href?: string
}

export default function CardSeller({
  id,
  sellerName = "Seller Name",
  sellerImg = "/img/slide1.png",
  className = "",
  href = "#",
}: CardSellerProps) {
  const [sellerImage, setSellerImage] = useState<string>("")

  useEffect(() => {
    setSellerImage(sellerImg)
  }, [sellerImg])

  return (
    <>
      <Link href={href} className={cn("group/card seller-card", className)}>
        <Card className="group-hover/card:bg-mute overflow-clip rounded-2xl transition-all hover:shadow">
          {/*//+ Image Container */}
          <div className="img-container relative h-40 w-full overflow-clip">
            <Image
              src={sellerImage}
              alt={sellerName}
              layout="fill"
              objectFit="cover"
              className="transition-transform group-hover/card:scale-105"
              onError={() => {
                setSellerImage(fallbackImage)
              }}
            />
          </div>
          {/*//+ Info Container */}
          <div className="info p-4">
            <div className="space-y-2 md:col-span-3">
              <span className="text-base font-semibold">{sellerName}</span>
              {/*//- Rating */}
              <div className="stars flex">
                <StarIcon className="size-4 text-yellow-400" />
                <StarIcon className="size-4 text-yellow-400" />
                <StarIcon className="size-4 text-yellow-400" />
                <StarIcon className="size-4 text-yellow-400" />
                <StarIcon className="size-4 text-yellow-400" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </>
  )
}
