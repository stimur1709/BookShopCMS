import {Author, Book} from "./Data";

export interface DataPage {
  sort: string;
  count: number,
  totalPages: number,
}

export interface BookPage extends DataPage {
  content: Book[]
}


export interface AuthorPage extends DataPage {
  content: Author[]
}
