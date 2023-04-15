import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './components/navigation/navigation.component';
import {BooksPageComponent} from './pages/book-page/books-page.component';
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AuthorsPageComponent} from './pages/author-page/authors-page.component';
import {ContentPageDirective} from './pages/content-page.directive';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {ModalComponent} from './pages/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {FilterComponent} from './components/filter/filter.component';
import {TableAuthorComponent} from './components/table-author/table-author.component';
import {TableBookComponent} from './components/table-book/table-book.component';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {QueryParamDirective} from './components/query-param.directive';
import {TableDirective} from './components/table.directive';
import {ModalDirective} from './components/modal.directive';
import {ListContentComponent} from './components/list-content/list-content.component';
import {BookModalComponent} from './components/book-modal/book-modal.component';
import {AuthorModalComponent} from './components/author-modal/author-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BooksPageComponent,
    AuthorsPageComponent,
    ContentPageDirective,
    ModalComponent,
    FilterComponent,
    TableAuthorComponent,
    TableBookComponent,
    PaginatorComponent,
    QueryParamDirective,
    TableDirective,
    ModalDirective,
    ListContentComponent,
    BookModalComponent,
    AuthorModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgbModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatTabsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
