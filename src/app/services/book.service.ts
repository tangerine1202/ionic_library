import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Book } from '../model/book.model';
import { AuthService } from './auth.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookCollection: AngularFirestoreCollection<Book>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private location: Location,
  ) {
    this.bookCollection = this.afs.collection<Book>('Books');
    // this.books = this.bookCollection.valueChanges();
  }

  addBook(book: Book) {
    this.bookCollection.add({ ...book }).then((doc) => {
      doc.update('uid', doc.id);
      this.location.back();
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
          // tslint:disable-next-line: object-literal-key-quotes
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
          // tslint:disable-next-line: object-literal-key-quotes
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

  updateBook(book: Book) {
    this.bookCollection.doc(book.uid).update(book).then( () => {
      console.log('book update!');
    }).catch( (err) => console.log('Error occurred at updateBook: \n', err) );
  }

  getBookByBookUid(uid: string) {
    if (uid === null) {
      uid = ' ';
    }
    return this.bookCollection.doc(uid).get();
  }

  getAllBooks() {
    return this.afs.collection('Books', ref => ref.orderBy('name')).valueChanges();
  }

  getBooksByOwnerUid() {
    return this.authService.user.pipe(
      switchMap((user, idx) => this.afs.collection('Books', ref => ref.where('ownerUid', '==', user.uid)).valueChanges()),
      map((books: Book[]) => books.sort((a, b) => a.name < b.name ? -1 : 1)),
      catchError(err => err)
    );
  }

  getBooksByBorrowerUid() {
    return this.authService.user.pipe(
      switchMap((user, idx) => this.afs.collection('Books', ref => ref.where('borrowerUid', '==', user.uid)).valueChanges()),
      map((books: Book[]) => books.sort((a, b) => a.name < b.name ? -1 : 1)),
      catchError(err => err)
    );
  }
}
