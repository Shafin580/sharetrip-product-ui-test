"use client"

import "./styles/scss/globals.scss"
import { Suspense } from "react"
import Loading from "./loading"
import { ErrorBoundary } from "react-error-boundary"
import GlobalError from "./global-error"
import TanStackQueryProvider from "@utils/providers/TanStackQuery.Providers"
import { RouteChangesProvider } from "nextjs-router-events"
import { cn } from "@/libs/utils"
import { ThemeProvider } from "@utils/providers/Theme.Provider"
import { CartStoreProvider } from "@utils/providers/CartStore.Providers"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en_us">
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <body className={cn("min-w-screen light flex flex-col")} suppressHydrationWarning={true}>
        {/* <NextTopLoader
          color={variables.primary}
          showSpinner={false}
          height={2.5}
          zIndex={9000}
          //         initialPosition={0.08}
          //         crawlSpeed={200}
          //         crawl={true}
          //         easing="ease"
          //         speed={200}
          //         shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        /> */}
        <Suspense fallback={<Loading />}>
          <ErrorBoundary
            onError={(error, info) => {
              console.error("RootLayout ErrorBoundary -> ", error, info)
            }}
            fallback={<GlobalError reset={() => window.location.reload()} />}
          >
            <CartStoreProvider>
              <TanStackQueryProvider>
                <RouteChangesProvider>{children}</RouteChangesProvider>
              </TanStackQueryProvider>
            </CartStoreProvider>
          </ErrorBoundary>
        </Suspense>
      </body>
    </html>
  )
}
