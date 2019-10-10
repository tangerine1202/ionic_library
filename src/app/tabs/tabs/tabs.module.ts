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
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { SettingsComponent } from '../settings/settings.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'bookShelf',
        component: BookShelfComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      }
    ]
  },
  {
    path: 'detail/:uid',
    component: BookDetailComponent,
    pathMatch: 'full',
  },
  {
    path: 'addBookForm',
    component: AddbookFormComponent,
  },

  {
    path: '',
    redirectTo: 'tabs/home',
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
    SettingsComponent,
    PageNotFoundComponent,
  ],
  // bootstrap: [TabsPage]
})
export class TabsPageModule {}
