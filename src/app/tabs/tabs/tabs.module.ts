import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { HomePageComponent } from '../home-page/home-page.component';
import { BookShelfComponent } from '../book-shelf/book-shelf.component';
import { AddbookFormComponent } from 'src/app/tabs/addbook-form/addbook-form.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { BooksListComponent } from '../books-list/books-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  }, {
    path: 'bookShelf',
    component: BookShelfComponent,
  }, {
    path: 'addBookForm',
    component: AddbookFormComponent,
  }, {
    path: 'detail/:uid',
    component: BookDetailComponent,
    pathMatch: 'full',
  }, {
    path: 'list',
    component: BooksListComponent,
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TabsPage,
    HomePageComponent,
    BookShelfComponent,
    BookDetailComponent,
    BooksListComponent,
    AddbookFormComponent,
  ]
})
export class TabsPageModule {}
