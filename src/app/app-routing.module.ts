import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooksPageComponent} from "./pages/book-page/books-page.component";
import {AuthorsPageComponent} from "./pages/author-page/authors-page.component";

const routes: Routes = [
  {path: 'book', component: BooksPageComponent},
  {path: 'author', component: AuthorsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
