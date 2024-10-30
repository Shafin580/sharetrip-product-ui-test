import { redirect as r } from "next/navigation"
import { LINKS } from "router.config"

export const redirect = (status: string | number): never => {
  if (typeof status !== "number") status = 500

  // if development, log the status code // => log path
  if (process.env.NODE_ENV === "development") {
    throw Error(`API call terminated with status ${status} will redirect to respective page in production!`)
  }

  // if mapper found, redirect to the corresponding page
  r(LINKS.ERROR(status).home)
}
