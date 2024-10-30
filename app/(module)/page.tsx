import ProductList from "@components/ProductList.client"
import { QueryClient } from "@tanstack/react-query"
import { QUERY } from "query.config"

const serverQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 2,
      retry: true,
    },
  },
})

export default async function Home() {
  return (
    <>
      <ProductList />
    </>
  )
}
