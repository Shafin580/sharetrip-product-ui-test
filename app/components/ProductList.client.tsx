"use client"

import CardProduct from "@components/globals/CardProduct"
import Section from "@components/globals/Section"
import TextField from "@library/TextField"
import { Button } from "@shad/button"
import { Combobox } from "@shad/combobox"
import { useQuery } from "@tanstack/react-query"
import { QUERY } from "query.config"
import { useEffect, useState } from "react"
import { LINKS } from "router.config"
import SkeletonCard from "./Skeleton/SkeletonCard"
import { getProductCategoryList, getProductList } from "services/api/api"

const ProductList = () => {
  const [productList, setProductList] = useState<ProductProps[]>([])
  const [productCategoryList, setProductCategoryList] = useState<{ value: string; label: string }[]>([])
  const [pageNo, setPageNo] = useState(1)
  const [limit, setLimit] = useState(30)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [selectedOrder, setSelectedOrder] = useState<string | undefined>()
  const [selectedSortBy, setSelectedSortBy] = useState<string | undefined>()
  const [searchText, setSearchText] = useState<string>("")
  const [debouncedSearchText, setDebouncedSearchText] = useState("")
  const [hasNextPage, setHasNextPage] = useState(true)

  // + Function To Get Product List
  const { data: productListQuery, isFetching: productListFetchingQuery } = useQuery({
    queryKey: [
      QUERY.PRODUCTS.LIST({
        limit: limit,
        category: selectedCategory,
        order: selectedOrder,
        searchText: debouncedSearchText,
        sortBy: selectedSortBy,
      }).key,
    ],
    queryFn: async () => {
      const data = await getProductList({
        limit: limit,
        category: selectedCategory,
        order: selectedOrder,
        searchText: debouncedSearchText,
        sortBy: selectedSortBy,
      })
      return data
    },
  })

  useEffect(() => {
    if (productListQuery) {
      if (productListQuery.status == 200) {
        setProductList(productListQuery.data)
        if (productListQuery.paginationData) {
          setHasNextPage(
            productListQuery.paginationData.limit < productListQuery.paginationData.total ? true : false
          )
        }
      }
    }
  }, [productListQuery])

  // + Function To Get Product Category List
  const { data: productCategoryListQuery, isFetching: productCategoryListFetchingQuery } = useQuery({
    queryKey: [QUERY.PRODUCTS.CATEGORY_LIST().key],
    queryFn: async () => {
      const data = await getProductCategoryList()
      return data
    },
  })

  useEffect(() => {
    if (productCategoryListQuery) {
      if (productCategoryListQuery.status == 200) {
        setProductCategoryList(
          productCategoryListQuery.data.map((element, index) => ({ value: String(index), label: element }))
        )
      }
    }
  }, [productCategoryListQuery])

  // + useEffect call for pagination
  useEffect(() => {
    setLimit(30 * pageNo)
  }, [pageNo])

  // + useEffect Call for search text debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText)
    }, 1500) // 1500ms delay

    return () => {
      clearTimeout(handler) // Clear timeout if searchText changes before the delay ends
    }
  }, [searchText])

  return (
    <Section>
      <header className="space-y-2">
        <h2 className="text-left">Product Listing Page</h2>
        <p className="max-w-lg text-pretty">Browse Our Curated Selection of Quality Products</p>
      </header>
      {/*//- Main Area */}
      <div className="mt-4 block items-start gap-4 xl:flex">
        {/*//- Right Area */}
        <div className="w-full">
          {/*//- Top Filter Bar */}
          <div className="flex items-start justify-between pb-4">
            <div className="flex gap-6">
              {/* {category dropdown} */}
              <Combobox
                placeholder="Select Category"
                hideTypeAhead
                onChange={(e) => {
                  setProductList([])
                  setSelectedCategory(e)
                }}
                items={productCategoryList}
              />
              {/* {sort dropdown} */}
              <Combobox
                placeholder="Select Sort"
                hideTypeAhead
                onChange={(e) => {
                  if (e == "Title (A to Z)") {
                    setSelectedSortBy("title")
                    setSelectedOrder("asc")
                  }

                  if (e == "Title (Z to A)") {
                    setSelectedSortBy("title")
                    setSelectedOrder("desc")
                  }

                  if (e == "Price (Low to High)") {
                    setSelectedSortBy("price")
                    setSelectedOrder("asc")
                  }

                  if (e == "Price (High to Low)") {
                    setSelectedSortBy("price")
                    setSelectedOrder("desc")
                  }
                }}
                items={[
                  { value: "1", label: "Title (A to Z)" },
                  { value: "2", label: "Title (Z to A)" },
                  { value: "3", label: "Price (Low to High)" },
                  { value: "4", label: "Price (High to Low)" },
                ]}
              />
            </div>
          </div>

          <div className="mb-6 w-[350px] mx-auto">
            <TextField
              placeholder="Search Products"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.data as string)
              }}
            />
          </div>
          {/*//+ Grid Area */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {productList.map((data, index) => {
              return <CardProduct key={index} productDetail={data} />
            })}
            {productList.length == 0 &&
              productListFetchingQuery &&
              Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)}
            {productList.length > 0 &&
              productListFetchingQuery &&
              Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)}
          </div>
          {productList.length > 0 && productListFetchingQuery == false && hasNextPage && (
            <div className="mt-6 text-center">
              <Button
                variant={"ghost"}
                className="col-span-4"
                onClick={() => {
                  setPageNo((prev) => prev + 1)
                }}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

export default ProductList
