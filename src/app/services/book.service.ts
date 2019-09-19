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

  private booksCollection: AngularFirestoreCollection<Book>;
  books: Observable<Book[]>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
  ) {
    this.booksCollection = afs.collection<Book>('Books');
    this.books = this.booksCollection.valueChanges();
  }

  addBook(book: Book) {
    this.booksCollection.add(book);
  }
}
