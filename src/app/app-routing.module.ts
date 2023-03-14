import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookPageComponent} from "./pages/book-page/book-page.component";

const routes: Routes = [
  {path: 'book', component: BookPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
