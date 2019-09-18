import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

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
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`User/${user.uid}`);

    // Firebase user have a fixed set of basic properties,
    // uid, email, displayName, photoURL
    const data: User = {
      uid: user.uid,
      name: user.displayName,
      email: user.email
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
