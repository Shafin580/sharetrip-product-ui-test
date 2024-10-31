"use client"

import CardProduct from "@components/globals/CardProduct"
import Section from "@components/globals/Section"
import SkeletonCard from "@components/Skeleton/SkeletonCard"
import { useQuery } from "@tanstack/react-query"
import { getDataFromIndexedDB } from "@utils/misc"
import { QUERY } from "query.config"
import { useEffect, useState } from "react"
import { LINKS } from "router.config"

const Wishlist = () => {
  {
    const [cachedData, setCachedData] = useState<any[]>([])

    const retrieveCachedData = async () => {
      const data = await getDataFromIndexedDB("wishlisted-books")
      setCachedData(data as any[])
    }

    useEffect(() => {
      retrieveCachedData()
    }, [])

    return (
      <Section>
        <header className="space-y-2">
          <h2 className="text-left">Book Wish-listing Page</h2>
          <p className="max-w-lg text-pretty">
            Explore a curated collection of must-read books across every genre, handpicked to inspire,
            educate, and entertain.
          </p>
        </header>
        {/*//- Main Area */}
        <div className="mt-4 block items-start gap-4 xl:flex">
          {/*//- Right Area */}
          <div className="w-full">
            {/*//+ Grid Area */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {
                cachedData.map((data, index) => {
                  return (
                    <CardProduct
                      key={index}
                      productDetail={data["data"]}
                    />
                  )
                })}
              
            </div>
          </div>
        </div>
      </Section>
    )
  }
}

export default Wishlist
