import {Author, Books} from "./Data";

export interface DataPage {
  sort: string;
  count: number,
  totalPages: number,
}

export interface BookPage extends DataPage {
  content: Books[]
}


export interface AuthorPage extends DataPage {
  content: Author[]
}
