"use client"

import { cn } from "@/libs/utils"
import ButtonIcon from "@library/ButtonIcon"
import { Heart, Trash2, Plus, Minus, Eye, ShoppingCart, Trash } from "lucide-react"
import { Card } from "@shad/card"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fallbackImage } from "services/api/api"
import { Button } from "@shad/button"
import { LINKS } from "router.config"
import ModalBlank from "@library/ModalBlank"
import ProductDetail from "./ProductDetail.Client"
import { addDataToIndexedDB, getDataFromIndexedDB, removeDataFromIndexedDB } from "@utils/misc"
import { useCartStore } from "@utils/providers/CartStore.Providers"

interface CardProductProps {
  productDetail: ProductProps
  className?: string
}

export default function CardProduct({ productDetail, className }: CardProductProps) {
  const [productImageSrc, setProductImageSrc] = useState<string>("")
  const [showModal, setShowModal] = useState(false)

  const [cachedData, setCachedData] = useState<any[]>([])
  const [isWishlisted, setIsWishlisted] = useState(false)

  const [isHovered, setIsHovered] = useState(false)

  const { addToCart, removeItem, removeFromCart, items } = useCartStore((state) => state)
  const isInCart = items.some((item) => item.id === productDetail.id)

  const toggleWishlist = async () => {
    if (isWishlisted) {
      await removeDataFromIndexedDB("wishlisted-products", String(productDetail?.id))
      console.log("Removed from wishlist")
    } else {
      await addDataToIndexedDB("wishlisted-products", {
        id: String(productDetail?.id),
        data: productDetail,
      })
      console.log("Added to wishlist")
    }
    const data = await getDataFromIndexedDB("wishlisted-products")
    setCachedData(data as any[])
  }

  useEffect(() => {
    const retrieveCachedData = async () => {
      const data = await getDataFromIndexedDB("wishlisted-products")
      setCachedData(data as any[])
    }

    retrieveCachedData()
  }, [])

  useEffect(() => {
    setIsWishlisted(cachedData.some((data) => data.id === String(productDetail?.id)))
  }, [cachedData, productDetail])

  useEffect(() => {
    setProductImageSrc(productDetail?.thumbnail)
  }, [productDetail])

  if (productDetail == null) {
    return null
  }
  return (
    <>
      <div
        className={cn(
          "group/card product-card transform transition-all duration-200 ease-in-out hover:scale-[1.02]",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Discount Badge */}
        <div
          className="absolute left-[-7px] top-2 z-10 px-4 py-2 text-xs font-semibold text-white shadow-md"
          style={{
            backgroundImage: "linear-gradient(to right, #f97316, #fb923c, #ffc98f)",
            clipPath: "polygon(50% 0%, 100% 0, 86% 49%, 100% 100%, 25% 100%, 0 100%, 0 0)",
          }}
        >
          - ৳ {Number(productDetail.price * (productDetail.discountPercentage / 100)).toFixed(2)}
        </div>
        <Card className="mx-auto max-w-sm overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
          <div className="relative border-b-2">
            {/* Wishlist Button */}
            {isWishlisted == false && (
              <Button
                className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 text-gray-900 shadow-md transition-colors duration-200 hover:bg-gray-100"
                onClick={() => {
                  toggleWishlist()
                }}
              >
                <Heart className="h-5 w-5 text-red-500" />
              </Button>
            )}

            {isWishlisted && (
              <Button
                className="absolute right-2 top-2 z-10 rounded-full bg-red-500 p-1.5 text-gray-900 shadow-md transition-colors duration-200 hover:bg-gray-100"
                onClick={() => {
                  toggleWishlist()
                }}
              >
                <Heart className="h-5 w-5 text-white" />
              </Button>
            )}

            {/* Product Image */}
            <div className="relative aspect-[3/4] h-[300px] w-full">
              <Image
                alt={productDetail.title}
                className="rounded-t-lg object-cover"
                height={400}
                width={300}
                src={productImageSrc}
                // onError={() => {
                //   setProductImageSrc(fallbackImage)
                // }}
              />
            </div>

            {/* Action Buttons */}
            {(isInCart || isHovered) && (
              <div className="absolute bottom-2 left-1/2 w-5/6 -translate-x-1/2 transform space-y-2">
                {items.findIndex((data) => data.id == productDetail.id) != -1 ? (
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 bg-green-500 p-2 text-white transition-all duration-150"
                  >
                    {items.filter((data) => data.id == productDetail.id).length == 1 && (
                      <Trash className="h-4 w-4" onClick={() => removeFromCart(productDetail.id)} />
                    )}
                    {items.filter((data) => data.id == productDetail.id).length > 1 && (
                      <Minus className="h-4 w-4" onClick={() => removeItem(productDetail.id)} />
                    )}
                    {items.filter((data) => data.id == productDetail.id).length} Added to Cart
                    <Plus
                      onClick={() => {
                        addToCart(productDetail)
                      }}
                      className="h-4 w-4"
                    />
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-slate-600/20 p-2 font-extrabold text-white shadow-md backdrop-blur-sm transition-all duration-150 hover:bg-white/50"
                    onClick={() => {
                      addToCart(productDetail)
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 [text-shadow:_0_8px_8px_rgb(99_102_241_/_0.8)]" />
                    <span className="[text-shadow:_0_8px_8px_rgb(99_102_241_/_0.8)]">Add to Cart</span>
                  </Button>
                )}

                <Button
                  variant="secondary"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-slate-600/20 p-2 font-extrabold text-white shadow-md backdrop-blur-sm transition-all duration-150 hover:bg-white/50"
                  onClick={() => {
                    setShowModal(true)
                  }}
                >
                  <Eye className="h-4 w-4 [text-shadow:_0_8px_8px_rgb(99_102_241_/_0.8)]" />
                  <span className="[text-shadow:_0_8px_8px_rgb(99_102_241_/_0.8)]">Quick View</span>
                </Button>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-2 p-4">
            <div className="text-xs font-medium text-gray-500">SKU: {productDetail.sku}</div>
            <h3 className="truncate text-base font-semibold">{productDetail.title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-blue-500">
                ৳{" "}
                {Number(
                  productDetail.price - productDetail.price * (productDetail.discountPercentage / 100)
                ).toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">৳ {productDetail.price}</span>
            </div>
          </div>
        </Card>
      </div>

      {showModal && (
        <ModalBlank
          modalSize="md"
          modalLayoutClassName="p-4"
          onCloseModal={() => {
            setShowModal(false)
          }}
          className="!bg-peach space-y-0 p-8 sm:p-8"
          onClickOutToClose={false}
          showCrossButton={true}
        >
          <ProductDetail productDetailsData={productDetail} />
        </ModalBlank>
      )}
    </>
  )
}
