import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { Book } from '../model/book.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  selectedBook: any;
  ownerName?: string | null;
  borrowerName?: string | null;

  constructor(
    public authService: AuthService,
    public bookService: BookService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.selectBook();
  }

  selectBook() {
    const uid = this.route.snapshot.paramMap.get('uid');
    // TODO: improve this heavy codes
    this.bookService.getBookByUid(uid).subscribe((doc) => {
      if (doc.exists) {
        this.selectedBook = doc.data();
        // set ownerName
        this.authService.getUserByUid(this.selectedBook.ownerUid).subscribe(ownerDoc => {
          if (ownerDoc.exists) {
            this.ownerName = ownerDoc.data().name;
          } else {
            console.log('No owner on the document!');
            this.ownerName = null;
          }
        });
        // set borrowerName
        this.authService.getUserByUid(this.selectedBook.borrowerUid).subscribe(borrowerDoc => {
          if (borrowerDoc.exists) {
            this.borrowerName = borrowerDoc.data().name;
          } else {
            console.log('No borrower on the document!');
            this.borrowerName = null;
          }
        });
      } else {
        console.log('No such document!');
        this.selectedBook = { uid: null, name: null, author: null, ownerUid: null } as Book;
        this.ownerName = null;
        this.borrowerName = null;
      }
    }, (err) => {console.log('Error occurred: ', err)});


    // this.bookService.getBookByUid(uid).subscribe(doc => {
    //   if (doc.exists) {
    //     this.selectedBook = doc.data();
    //   } else {
    //     console.log('No such document!');
    //     this.selectedBook = { uid: null, name: null, author: null, ownerUid: null } as Book;
    //   }
    // }, (err) => {console.log('Error occurred: ', err)});
    // this.selectedBook = this.bookService.getBookByUid(uid);
    // this.ownerName = this.authService.getUserByUid(this.selectedBook.ownerUid);
  }

  borrowBook() {
    const userUid = this.authService.userData.uid;
    const bookUid = this.selectedBook.uid;
    this.bookService.borrowBook(userUid, bookUid);
    this.goBack();
  }

  returnBook() {
    const userUid = this.authService.userData.uid;
    const bookUid = this.selectedBook.uid;
    this.bookService.returnBook(userUid, bookUid);
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

}
