import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent},
  { path: '', redirectTo: 'login' , pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { 
        enableTracing: true, // debuggin purposes only
        // preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
