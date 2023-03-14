export interface QueryParams {
  offset: number,
  limit: number,
  reverse: boolean,
  sort: string,

  totalPages?: number,
  count?: number,
}
