export interface QueryParams {
  search: string | null,
  offset: number,
  limit: number,
  reverse: boolean,
  property: string | null
}

export interface PaginatorParams {
  totalPages?: number,
  totalElements?: number,
}

export interface BookQueryParams extends QueryParams {
  bestseller: boolean,
  discount: boolean,
  from?: string | null,
  to?: string | null
}
