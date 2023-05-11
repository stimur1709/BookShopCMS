import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooksPageComponent} from "./pages/book-page/books-page.component";
import {AuthorsPageComponent} from "./pages/author-page/authors-page.component";
import {LineChartComponent} from "./components/line-chart/line-chart.component";
import {TagPageComponent} from "./pages/tag-page/tag-page.component";
import {GenrePageComponent} from "./pages/genre-page/genre-page.component";

const routes: Routes = [
  {path: '', component: LineChartComponent},
  {path: 'book', component: BooksPageComponent},
  {path: 'author', component: AuthorsPageComponent},
  {path: 'tag', component: TagPageComponent},
  {path: 'genre', component: GenrePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
