import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { Book } from '../model/book.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookCollection: AngularFirestoreCollection<Book>;
  books: Observable<Book[]>;
  userOwnedBooks: Observable<Book[]> | null;
  userBorrowedBooks: Observable<Book[]> | null;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
  ) {
    this.bookCollection = this.afs.collection<Book>('Books');
    this.books = this.bookCollection.valueChanges();
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
          if(docRef.data().borrowerUid === this.auth.userData.uid) {
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
          doc.update({ 'borrowerUid': null });
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

  getBookByUid(uid: string) {
    if (uid === null) {
      uid = ' ';
    }
    return this.bookCollection.doc(uid).get();
    // .subscribe(doc => {
    //   if (doc.exists) {
    //     // console.log('book data: ', doc.data());
    //     return doc.data();
    //   } else {
    //     console.log('No such document!');
    //     return { uid: null, name: null, author: null, ownerUid: null } as Book;
    //   }
    // }, (err) => {console.log('Error occurred: ', err)});
    // this.bookCollection.doc(uid).ref.get().then(doc => {
    //   if (doc.exists) {
    //     // console.log('book data: ', doc.data());
    //     return doc.data();
    //   } else {
    //     console.log('No such document!');
    //     return { uid: null, name: null, author: null, ownerUid: null } as Book;
    //   }
    // }).catch(err => console.log('Error occurred: ', err));
  }
}
