import Navbar from "@components/globals/Navbar"
import { QueryClient } from "@tanstack/react-query"
import { Metadata } from "next"
import { QUERY } from "query.config"
import { SITE_METADATA } from "seo.config"

export const metadata: Metadata = {
  ...SITE_METADATA,
}

const serverQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 2,
      retry: true,
    },
  },
})

const WebUILayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <Navbar />
        <main className="min-h-[80dvh] pt-[5.5rem]">{children}</main>
    </div>
  )
}

export default WebUILayout
