/**
 * List of all the links in the app for frontend rendering
 */
export const LINKS = {
  HOME: "/" as const,
  WISHLIST: "/wishlist" as const,
  CART: "/cart" as const,
  ERROR: (code: number) => {
    return { home: `/error?code=${code}` } as const
  },
} as const

/**
 * List of all the paths in the app for backend data fetching
 */
export const PATHS = {
  PRODUCTS: {
    LIST: ({
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
      if (category) {
        return {
          root: `/products/category/${category}?skip=0${order ? `&order=${order}` : ""}${limit ? `&limit=${limit}` : ""}${sortBy ? `&sortBy=${sortBy}` : ""}${searchText && searchText.trim().length > 0 ? `&q=${searchText}` : ""}` as const,
        }
      } else {
        return {
          root: `/products?skip=0${order ? `&order=${order}` : ""}${limit ? `&limit=${limit}` : ""}${sortBy ? `&sortBy=${sortBy}` : ""}${searchText && searchText.trim().length > 0 ? `&q=${searchText}` : ""}` as const,
        }
      }
    },
    DYNAMIC: (id: string | number) => {
      return { root: `/products/${id}` as const }
    },
    CATEGORY_LIST: () => {
      return { root: `/products/category-list` as const }
    },
  } as const,
} as const
