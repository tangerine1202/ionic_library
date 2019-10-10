import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './tabs/home-page/home-page.component';
import { BookShelfComponent } from './tabs/book-shelf/book-shelf.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BooksListComponent } from './tabs/books-list/books-list.component';
import { BookDetailComponent } from './tabs/book-detail/book-detail.component';
import { AuthGuard } from './auth.guard';
import { AddbookFormComponent } from './tabs/addbook-form/addbook-form.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './auth/login/login.module#LoginPageModule',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
  },
  {
    path: '',
    loadChildren: './tabs/tabs/tabs.module#TabsPageModule',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  }, {
    path: '**',
    component: PageNotFoundComponent,
  },

  // {
  //   path: 'login1',
  //   component: LoginPageComponent,
  //   data: { authGuardPipe: redirectLoggedInToHome }
  // }, {
  //   path: 'home',
  //   component: HomePageComponent,
  //   canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLogin }
  // }, {
  //   path: 'bookShelf',
  //   component: BookShelfComponent,
  //   canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLogin }
  // }, {
  //   path: 'addBookForm',
  //   component: AddbookFormComponent,
  //   canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLogin }
  // }, {
  //   path: 'detail/:uid',
  //   component: BookDetailComponent,
  //   pathMatch: 'full',
  //   canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLogin }},
  // {
  //   path: 'list',
  //   component: BooksListComponent,
  //   canActivate: [AngularFireAuthGuard],
  //   data: { authGuardPipe: redirectUnauthorizedToLogin }
  // }, {
  //   path: '',
  //   redirectTo: 'login' ,
  //   pathMatch: 'full',
  // }, {

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: false, // debuggin purposes only
        // preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
