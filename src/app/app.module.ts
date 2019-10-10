import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
// import { HomePageComponent } from './tabs/home-page/home-page.component';
// import { BookShelfComponent } from './tabs/book-shelf/book-shelf.component';
// import { BooksListComponent } from './tabs/books-list/books-list.component';
// import { BookDetailComponent } from './tabs/book-detail/book-detail.component';
// import { AddbookFormComponent } from './tabs/addbook-form/addbook-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { TabsPageModule } from './tabs/tabs/tabs.module';
import { TabsPage } from './tabs/tabs/tabs.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    // PageNotFoundComponent,
    // HomePageComponent,
    // BookShelfComponent,
    // BookDetailComponent,
    // BooksListComponent,
    // AddbookFormComponent,
  ],
  entryComponents: [ ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AppRoutingModule,
    TabsPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
