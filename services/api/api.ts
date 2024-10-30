import { PATHS } from "router.config"
import { getAPIResponse } from "./get-api-response"

export const fallbackImage = "/img/img-placeholder.jpg"

const basePath = String(process.env.NEXT_PUBLIC_API_MASK_URL)

// + Function to get list of Products
export const getProductList = async ({
  limit,
  searchText,
  order,
  sortBy,
  category,
}: {
  limit: string | number
  searchText?: string
  order?: string
  sortBy?: string
  category?: string
}) => {
  const data = await getAPIResponse({
    basePath: basePath,
    apiPath: PATHS.PRODUCTS.LIST({
      limit: limit,
      searchText: searchText,
      order: order,
      sortBy: sortBy,
      category: category,
    }).root,
  })

  let formattedData: ProductProps[] = []
  let paginationData: { total: number; skip: number; limit: number } | null = null

  if (data["status"] == 200) {
    formattedData = data["data"]["products"]
    paginationData = {
      total: Number(data["data"]["total"]),
      skip: Number(data["data"]["skip"]),
      limit: Number(data["data"]["limit"]),
    }
  }

  console.log("Product List:", formattedData)

  return { status: Number(data["status"]), data: formattedData, paginationData: paginationData }
}

// + Function To get Product Details by Id
export const getProductDetails = async (id: string | number) => {
  const response = await getAPIResponse({
    basePath: basePath,
    apiPath: PATHS.PRODUCTS.DYNAMIC(id).root,
  })

  let formattedData: ProductProps | null = null

  if (response.status == 200) {
    formattedData = response["data"]
  }

  console.log("Product Details:", formattedData)

  return { status: Number(response.status), data: formattedData }
}

// + Function To get Product Category List
export const getProductCategoryList = async () => {
  const response = await getAPIResponse({
    basePath: basePath,
    apiPath: PATHS.PRODUCTS.CATEGORY_LIST().root,
  })

  let formattedData: string[] = []

  if (response.status == 200) {
    formattedData = response["data"]
  }

  console.log("Product category list:", formattedData)

  return { status: Number(response.status), data: formattedData }
}
