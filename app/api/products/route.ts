import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url)
  const skip = searchParams.get("skip") || 0
  const limit = searchParams.get("limit") || 30
  const search = searchParams.get("q") || undefined
  const sortBy = searchParams.get("sortBy") || undefined
  const order = searchParams.get("order") || "asc"

  try {
    let url = `${String(process.env.API_URL!)}/products?skip=${skip}&limit=${limit}`

    if (search) {
      url += `&q=${search}`
    }
    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`
    }

    const response = await fetch(url, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(60_000),
    })

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch data` }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ error: "An error occurred while fetching data" }, { status: 500 })
  }
}
