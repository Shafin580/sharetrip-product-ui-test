"use client"

import CardProduct from "@components/globals/CardProduct"
import Section from "@components/globals/Section"
import SkeletonCard from "@components/Skeleton/SkeletonCard"
import { useQuery } from "@tanstack/react-query"
import { getDataFromIndexedDB } from "@utils/misc"
import { QUERY } from "query.config"
import { useEffect, useState } from "react"
import { LINKS } from "router.config"
import { getBookList } from "services/api/api"

const Wishlist = () => {
  {
    const [bookList, setBookList] = useState<BookListProps[]>([])
    const [cachedData, setCachedData] = useState<any[]>([])

    const retrieveCachedData = async () => {
      const data = await getDataFromIndexedDB("wishlisted-books")
      setCachedData(data as any[])
    }

    useEffect(() => {
      retrieveCachedData()
    }, [])

    // + Function To Get Book List
    const { data: bookListQuery, isFetching: bookListFetchingQuery } = useQuery({
      queryKey: [
        QUERY.PRODUCTS.LIST({
          page: 1,
          search: "",
          topic: "",
          ids: cachedData.map((data) => data.id).join(","),
        }).key,
      ],
      queryFn: async () => {
        const data = await getBookList({
          page: 1,
          search: "",
          topic: "",
          ids: cachedData.map((data) => data.id).join(","),
        })
        return data
      },
      enabled: cachedData.length > 0,
    })

    useEffect(() => {
      if (bookListQuery) {
        if (bookListQuery.status == 200) {
          setBookList(bookListQuery.data)
        }
      }
    }, [bookListQuery])

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
              {bookListFetchingQuery == false &&
                bookList.map((data, index) => {
                  return (
                    <CardProduct
                      key={index}
                      id={String(data.id)}
                      authorName={data.authors.length > 0 ? data.authors[0].name : "Unknown Author"}
                      bookImage={data.formats["image/jpeg"]}
                      title={data.title}
                      href={LINKS.PRODUCTS.DYNAMIC(String(data.id)).path}
                      genre={data.subjects}
                    />
                  )
                })}
              {bookListFetchingQuery &&
                Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)}
            </div>
          </div>
        </div>
      </Section>
    )
  }
}

export default Wishlist
