"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@shad/button"
import { Breadcrumbs } from "@components/globals/Breadcrumb"
import Section from "@components/globals/Section"
import { BuildingStorefrontIcon, HeartIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { QUERY } from "query.config"
import { useQuery } from "@tanstack/react-query"
import { handleImageZoom } from "@/libs/utils"
import { getBookDetails } from "services/api/api"
import { addDataToIndexedDB, getDataFromIndexedDB, removeDataFromIndexedDB } from "@utils/misc"
import SkeletonDetails from "@components/Skeleton/SkeletonDetails"

const BookDetail = ({
  bookId,
  initialData,
}: {
  bookId: string
  initialData: { status: number; data: BookDetailProps | null }
}) => {
  const [bookDetail, setBookDetail] = useState<BookDetailProps | null>(null)
  const imageZoom = document.getElementById("imageZoom") as HTMLElement | null
  const [cachedData, setCachedData] = useState<any[]>([])

  const retrieveCachedData = async () => {
    const data = await getDataFromIndexedDB("wishlisted-books")
    setCachedData(data as any[])
  }

  useEffect(() => {
    retrieveCachedData()
  }, [])

  handleImageZoom(imageZoom)

  // + Funtion To get Book Details
  const { data: bookDetailQuery, isFetching: bookDetailQueryFetching } = useQuery({
    queryKey: [QUERY.PRODUCTS.DYNAMIC(bookId).key],
    queryFn: async () => {
      const data = await getBookDetails(bookId)
      return data
    },
    initialData: initialData,
  })

  useEffect(() => {
    if (bookDetailQuery && bookDetailQuery.status == 200) {
      setBookDetail(bookDetailQuery.data)
    }
  }, [bookDetailQuery])

  if (bookDetailQueryFetching) {
    return <SkeletonDetails />
  }

  return (
    <>
      {bookDetail ? (
        <Section>
          <Breadcrumbs />
          <div className="mt-8 grid-cols-2 gap-20 lg:grid">
            {/*//+ Left Section */}
            <div className="relative w-full space-y-3">
              {/* //- Main Image */}
              <div
                className="relative"
                id="imageZoom"
                style={
                  {
                    "--url": `url(${bookDetail.formats["image/jpeg"]})`,
                    "--zoom-x": "0%",
                    "--zoom-y": "0%",
                    "--display": "none",
                  } as any
                }
              >
                <Image
                  src={bookDetail.formats["image/jpeg"]}
                  alt={String(bookDetail?.title)}
                  width={1200}
                  height={0}
                  className="aspect-square border object-contain"
                />
              </div>
            </div>
            {/*//+ Right Section */}
            <div className="right space-y-8">
              {/*//- Title */}
              <div className="space-y-2">
                <small className="flex items-center space-x-1 text-muted-foreground">
                  <BuildingStorefrontIcon className="size-3" />
                  <span className="relative top-[.5px]">
                    {bookDetail.authors.length > 0 ? bookDetail.authors[0].name : "Unknown Author"}
                  </span>
                </small>
                <div className="flex justify-between">
                  <h3 className="inline-flex">{bookDetail.title}</h3>
                </div>
              </div>
              {/*//- Rating */}
              <div className="stars flex">
                <small className="ml-2 flex items-center space-x-1 text-muted-foreground">
                  {bookDetail.download_count} Downloads
                </small>
              </div>
              {/*//- Description */}
              <div className="flex flex-wrap gap-2">
                <p className="text-xs">Genre:</p>
                {bookDetail.subjects?.map((g, index) => (
                  <span key={index} className="rounded-md bg-gray-200 px-1 py-1 text-xs font-bold">
                    {g}
                  </span>
                ))}
              </div>
              {/*//- Features */}
              <div className="features flex justify-between gap-4">
                <div className="">
                  <small className="text-muted-foreground">Language</small>
                  <p className="text-sm">{bookDetail.languages.join(", ")}</p>
                </div>

                <div className="">
                  <small className="text-muted-foreground">Has Copyright</small>
                  <p className="text-sm">{bookDetail.copyright == true ? "Yes" : "No"}</p>
                </div>
              </div>

              {cachedData.find((data: any) => data.id == `${bookId}`) ? (
                <Button
                  size={"lg"}
                  onClick={() => {
                    removeDataFromIndexedDB("wishlisted-books", bookId)
                    retrieveCachedData()
                    console.log("Removed from wishlist", cachedData)
                  }}
                >
                  Remove from wishlist
                </Button>
              ) : (
                <Button
                  size={"lg"}
                  onClick={() => {
                    let temp = { id: `${bookId}`, name: bookDetail.title }
                    addDataToIndexedDB("wishlisted-books", temp)
                    retrieveCachedData()
                    console.log("Added to wishlist", cachedData)
                  }}
                >
                  Add to Wishlist
                </Button>
              )}
            </div>
          </div>
        </Section>
      ) : null}
    </>
  )
}

export default BookDetail
