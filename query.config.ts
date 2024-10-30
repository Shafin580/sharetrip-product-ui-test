/**
 * List of all the query keys in the app for data fetching
 */
export const QUERY = {
  PRODUCTS: {
    LIST: ({
      limit,
      searchText,
      order = "asc",
      sortBy,
      category,
    }: {
      limit: string | number
      searchText?: string
      order?: string
      sortBy?: string
      category?: string
    }) => {
      return { key: `product-list-${limit}-${searchText}-${order}-${sortBy}-${category}` }
    },
    DYNAMIC: (id: string | number) => {
      return { key: `product-details-${id}` as const }
    },
    CATEGORY_LIST: () => {
      return { key: `product-category-list` as const }
    },
  } as const,
} as const
