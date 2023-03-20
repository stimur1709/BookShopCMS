import {Book} from "./Model";

export interface DataPage {
  sort: string;
  count: number,
  totalPages: number,
}

export interface BookPage extends DataPage {
  content: Book[]
}
