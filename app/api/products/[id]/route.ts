import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const id = req.url.split("/").pop()

  try {
    const response = await fetch(process.env.API_URL + `/products/${id}`, {
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