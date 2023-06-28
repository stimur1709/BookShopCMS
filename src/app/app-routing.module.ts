import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooksPageComponent} from "./pages/book-page/books-page.component";
import {AuthorsPageComponent} from "./pages/author-page/authors-page.component";
import {MainComponent} from "./pages/main/main.component";
import {AuthGuard} from "./guard/auth-guard.service";
import {ReviewComponent} from "./pages/review/review.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'book', component: BooksPageComponent, canActivate: [AuthGuard]},
  {path: 'author', component: AuthorsPageComponent, canActivate: [AuthGuard]},
  {path: 'review', component: ReviewComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
