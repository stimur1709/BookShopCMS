export interface Data {
  id: number
}

export interface Book extends Data {
  title: string
  discount: number,
  image: string,
  isBestseller: number,
  popularity: number,
  price: number,
  slug: string,
  pubDate: string,
  code: string,
  rate: number
}

export interface Author extends Data {
  name: string
  description: string,
}

