import { QueryClient } from "@tanstack/react-query"
import BookDetail from "./BookDetail.Client"
import { QUERY } from "query.config"
import { getBookDetails } from "services/api/api"

const serverQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 /** milliseconds */ * 60 /** seconds */ * 10 /** minutes */,
      retry: true,
    },
  },
})

export default async function page({ params: { id } }: { params: { id: string } }) {
  const bookDetails = await serverQueryClient.fetchQuery({
    queryKey: [QUERY.PRODUCTS.DYNAMIC(id).key],
    queryFn: async () => {
      const data = await getBookDetails(id)
      return data
    },
  })
  return <BookDetail bookId={id} initialData={bookDetails} />
}
