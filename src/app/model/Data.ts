export interface Data {
  id: number
}

export interface Books extends Data {
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

interface TagBook extends Data {
  slug: string,
  name: string,
}

interface Genre extends Data {
  slug: string,
  name: string,
}

interface BookFile {
}

interface BookRating {
}

export interface Book extends Books {
  description: string,
  userRating: number,
  count1: number,
  count2: number,
  count3: number,
  count4: number,
  count5: number,
  rateReview: number,
  downloadCount: number,
  tagList: TagBook[];
  bookFileList: BookFile[];
  bookRatingList: BookRating[];
  authorList: Author[];
  genreList: Genre[];
}

export interface Author extends Data {
  slug: string;
  name: string
  description: string,
}

