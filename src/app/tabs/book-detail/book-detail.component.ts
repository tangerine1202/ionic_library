import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../model/book.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  selectedBook: Book;
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

  // TODO: improve this heavy codes
  selectBook() {
    const uid = this.route.snapshot.paramMap.get('uid');
    this.bookService.getBookByBookUid(uid).subscribe((doc) => {
      if (doc.exists) {
        this.selectedBook = doc.data() as Book;
        console.log(this.selectedBook);
        // get ownerName
        this.authService.getUserByUid(this.selectedBook.ownerUid).subscribe(ownerDoc => {
          if (ownerDoc.exists) {
            this.ownerName = ownerDoc.data().name;
          } else {
            console.log('No owner on the document!');
            this.ownerName = null;
          }
        });
        // get borrowerName
        this.authService.getUserByUid(this.selectedBook.borrowerUid).subscribe(borrowerDoc => {
          if (borrowerDoc.exists) {
            this.borrowerName = borrowerDoc.data().name;
          } else {
            console.log('No borrower on the document!');
            this.borrowerName = null;
          }
        });
      } else {
        // TODO: direct to empty template
        console.log('No such document!');
        this.location.back();
        this.selectedBook = { uid: null, name: null, author: null, ownerUid: null } as Book;
        this.ownerName = null;
        this.borrowerName = null;
      }
    }, (err) => {console.log('Error occurred: ', err); });
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
