import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // if want to get Firebase DocumentReference, use userDoc.ref
  // userDoc: AngularFirestoreDocument<User>;
  userData: any;
  // user: Observable, use to show the data in veiw
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          // this.userDoc = this.afs.doc<User>(`User/${user.uid}`);
          return this.afs.doc<User>(`User/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );

    this.user.subscribe((u) => {
      if (u !== null) {
        this.userData = u;
        console.log('userdata:', this.userData);
      } else {
        this.userData = new User(null, null, null);
        console.log('userdata: null');
      }
    });

  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.router.navigate(['home']);
      return this.updateUserData(credential.user);
    } catch (err) {
      console.log(err);
      return;
    }
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
