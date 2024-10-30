import type { AppProps } from "next/app"
import "../app/styles/scss/globals.scss"

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
