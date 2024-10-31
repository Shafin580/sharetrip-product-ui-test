"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@shad/button"
import Section from "@components/globals/Section"
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { handleImageZoom } from "@/libs/utils"
import { addDataToIndexedDB, getDataFromIndexedDB, removeDataFromIndexedDB } from "@utils/misc"

const ProductDetail = ({ productDetailsData }: { productDetailsData: ProductProps | null }) => {
  const [cachedData, setCachedData] = useState<any[]>([])
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const retrieveCachedData = async () => {
      const data = await getDataFromIndexedDB("wishlisted-products")
      setCachedData(data as any[])
    }

    retrieveCachedData()

    const imageZoom = document.getElementById("imageZoom") as HTMLElement | null
    if (imageZoom) handleImageZoom(imageZoom)
  }, [])

  const toggleWishlist = async () => {
    if (isWishlisted) {
      await removeDataFromIndexedDB("wishlisted-products", String(productDetailsData?.id))
      console.log("Removed from wishlist")
    } else {
      await addDataToIndexedDB("wishlisted-products", {
        id: String(productDetailsData?.id),
        data: productDetailsData,
      })
      console.log("Added to wishlist")
    }
    const data = await getDataFromIndexedDB("wishlisted-products")
    setCachedData(data as any[])
  }

  useEffect(() => {
    setIsWishlisted(cachedData.some((data) => data.id === String(productDetailsData?.id)))
  }, [cachedData])

  if (productDetailsData == null) {
    return null
  }

  return (
    <Section>
      <div className="mt-8 grid-cols-2 gap-20 lg:grid">
        {/* Left Section */}
        <div className="relative w-full space-y-4">
          {/* Main Image */}
          <div
            id="imageZoom"
            style={
              {
                "--url": `url(${productDetailsData.thumbnail})`,
                "--zoom-x": "0%",
                "--zoom-y": "0%",
                "--display": "none",
              } as React.CSSProperties
            }
            className="relative"
          >
            <Image
              src={productDetailsData.thumbnail}
              alt={productDetailsData.title}
              width={1200}
              height={0}
              className="aspect-square rounded-lg border object-contain"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {productDetailsData.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="right space-y-8">
          {/* Product Info */}
          <div className="space-y-2">
            <small className="flex items-center space-x-1 text-muted-foreground">
              <BuildingStorefrontIcon className="size-3" />
              <span className="relative top-[.5px]">{productDetailsData.category}</span>
            </small>
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">{productDetailsData.title}</h3>
            </div>
          </div>

          {/* Rating */}
          <div className="stars flex">
            <small className="ml-2 flex items-center space-x-1 text-muted-foreground">
              {productDetailsData.rating} Rating
            </small>
          </div>

          {/* Description */}
          <div className="flex flex-wrap gap-2 text-gray-600">{productDetailsData.description}</div>

          {/* Additional Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Brand:</span>
              <span className="text-sm">{productDetailsData.brand || "--"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">SKU:</span>
              <span className="text-sm">{productDetailsData.sku}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Stock:</span>
              <span className={`text-sm ${productDetailsData.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {productDetailsData.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Shipping:</span>
              <span className="text-sm">{productDetailsData.shippingInformation}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Warranty:</span>
              <span className="text-sm">{productDetailsData.warrantyInformation}</span>
            </div>
          </div>

          {/* Wishlist Button */}
          <Button size="lg" onClick={toggleWishlist} className="mt-4">
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>

          {/* Reviews */}
          <div className="space-y-4">
            <h4 className="text-md font-bold text-gray-800">Customer Reviews</h4>
            <div className="space-y-2">
              {productDetailsData.reviews.map((review, index) => (
                <div key={index} className="rounded-lg bg-gray-100 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{review.reviewerName}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">{review.comment}</div>
                  <div className="text-yellow-400">
                    {`★`.repeat(review.rating)} {`☆`.repeat(5 - review.rating)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ProductDetail
