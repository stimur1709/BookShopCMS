export interface QueryParams {
  search: string;
  offset: number,
  limit: number,
  reverse: boolean,
  property: string

  totalPages?: number,
  count?: number,
}
