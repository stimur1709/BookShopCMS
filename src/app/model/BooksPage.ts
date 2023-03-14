import {Book} from "./Book";

export interface BooksPage {
  sort: string;
  count: number,
  totalPages: number,
  books: Book[]
}
