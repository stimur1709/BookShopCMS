import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './components/navigation/navigation.component';
import {BooksPageComponent} from './pages/book-page/books-page.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
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
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LineChartComponent} from './components/line-chart/line-chart.component';
import {DateParserDirective} from './components/date-parser.directive';
import {CalendarComponent} from './components/calendar/calendar.component';
import {SelectBoxComponent} from './components/select-box/select-box.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTreeModule} from '@angular/material/tree';
import {DoughnutChartComponent} from './components/doughnut-chart/doughnut-chart.component';
import {LoginComponent} from './components/login/login.component';
import {MainComponent} from './pages/main/main.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {ErrorInterceptor} from "./helpers/error-interceptor.service";
import {ReviewComponent} from './pages/review/review.component';
import {ReviewTableComponent} from './components/review-table/review-table.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

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
    AuthorModalComponent,
    LineChartComponent,
    DateParserDirective,
    CalendarComponent,
    SelectBoxComponent,
    DoughnutChartComponent,
    LoginComponent,
    MainComponent,
    ReviewComponent,
    ReviewTableComponent
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
    MatTabsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTreeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'ru'
    })
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
