import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { Book } from '../model/book.model';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookCollection: AngularFirestoreCollection<Book>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) {
    this.bookCollection = this.afs.collection<Book>('Books');
    // this.books = this.bookCollection.valueChanges();
  }

  addBook(book: Book) {
    this.bookCollection.add({ ...book }).then((doc) => {
      doc.update('uid', doc.id);
      return 'Book added!';
    }).then(msg => {
      console.log(msg);
    }).catch(err => {
      console.log('Error occurred at book.service.addBook: \n', err);
    });
  }

  borrowBook(userUid: string, bookUid: string) {
    const doc = this.bookCollection.doc(bookUid);
    doc.ref.get().then(docRef => {
      if (docRef.exists) {
        // Check whether book is borrowed
        if (docRef.data().borrowerUid === null) {
          doc.update({ 'borrowerUid': userUid });
          console.log('borrowing book successfully!');
        } else {
          // TODO: Check if book is already borrowed by user
          if (docRef.data().borrowerUid === this.authService.userData.uid) {
            console.log('the book is already borrowed by you!');
          } else {
            console.log(`book is borrowed by uid: ${docRef.data().borrowerUid}!`);
          }
        }
      } else {
        console.log('book doesn\'t exist!');
      }
    });
    return;
  }

  returnBook(userUid: string, bookUid: string) {
    const doc = this.bookCollection.doc(bookUid);
    doc.ref.get().then(docRef => {
      if (docRef.exists) {
        // Check whether book is borrowed by user
        if (docRef.data().borrowerUid === userUid) {
          doc.update({'borrowerUid': null });
          console.log('book return successfully!');
        } else {
          console.log(`book is not borrowed by you. It\'s borrowed by uid: ${docRef.data().borrowerUid}`);
        }
      } else {
        console.log('book doesn\'t exist!');
      }
    });
    return;
  }

  // updateBook() {

  // }

  getBookByBookUid(uid: string) {
    if (uid === null) {
      uid = ' ';
    }
    return this.bookCollection.doc(uid).get();
  }

  getAllBooks() {
    return this.bookCollection.valueChanges();
  }

  getBooksByOwnerUid() {
    return this.authService.user.pipe(
      switchMap((user, idx) => this.afs.collection('Books', ref => ref.where('ownerUid', '==', user.uid)).valueChanges()
      )
    );
  }

  getBooksByBorrowerUid() {
    return this.authService.user.pipe(
      switchMap((user, idx) => this.afs.collection('Books', ref => ref.where('borrowerUid', '==', user.uid)).valueChanges()
      )
    );
  }
}
