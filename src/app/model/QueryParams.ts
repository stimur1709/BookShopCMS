export interface QueryParams {
  search: string;
  offset: number,
  limit: number,
  reverse: boolean,
  property: string
}

export interface PaginatorParams {
  totalPages?: number,
  count?: number,
}

export interface BookQueryParams extends QueryParams {
  bestseller: boolean,
  discount: boolean
}
