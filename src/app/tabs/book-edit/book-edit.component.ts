import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/model/book.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
  // selectedBook = new Book(null, null, null, null);
  selectedBook: Book;

  constructor(
    public authService: AuthService,
    public bookService: BookService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('uid');

    this.bookService.getBookByBookUid(uid).subscribe((doc) => {
      if (doc.exists) {
        // auth the ownership
        this.authService.user.pipe(
          first()
        ).toPromise().then(user => {
          if (doc.data().ownerUid === user.uid) {
            this.selectedBook = doc.data() as Book;
          } else {
            console.log('this book is not belong to you!');
            this.location.back();
          }
        }).catch(err => console.log('Promise Error occurred: ', err));
      } else {
        console.log('No such document!');
        this.location.back();
      }
    }, (err) => { console.log('Error occurred: ', err); });
  }

  onSubmit() {
    this.authService.user.pipe(
      first()
    ).toPromise().then(user => {
      // second authority check
      if (this.selectedBook.ownerUid === user.uid) {
        this.bookService.updateBook(this.selectedBook);
        this.location.back();
      } else {
        console.log('Please submit the form later.');
      }
    });
  }

}
