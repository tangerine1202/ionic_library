import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  userRef: AngularFirestoreDocument<User> = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap( user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`User/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
   }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      // If login successfully, navigate to HomePage.
      this.router.navigate(['home']);
      return this.updateUserData(credential.user);
    } catch(err) {
      console.log(err);
      return ;
    }
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    this.userRef = this.afs.doc(`User/${user.uid}`);

    // Firebase user have a fixed set of basic properties,
    // uid, email, displayName, photoURL
    const data: User = {
      uid: user.uid,
      name: user.displayName,
      email: user.email
    };

    return this.userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
