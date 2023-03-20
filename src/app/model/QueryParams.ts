export interface QueryParams {
  search: string;
  offset: number,
  limit: number,
  reverse: boolean,
  property: string

  totalPages?: number,
  count?: number,
}

export interface BookQueryParams extends QueryParams {
  bestseller: boolean
}
