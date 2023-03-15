export interface QueryParams {
  offset: number,
  limit: number,
  reverse: boolean,
  property: string

  totalPages?: number,
  count?: number,
}
