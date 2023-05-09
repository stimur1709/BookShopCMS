export interface Query {

}

export interface QueryParams extends Query {
  search?: string | null,
  offset: number,
  limit: number,
  reverse?: boolean,
  property?: string | null
  ids?: number[] | null
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

export interface DataModal {
  type: number,
  slug: string
}

export interface BTQuery extends Query {
  bookId: number | null,
  interval?: string
  dateS: string,
  dateE: string
}

export interface IntervalDate {
  dateS: string,
  dateE: string
}
