import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/model/book.model';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.scss'],
})
export class BookShelfComponent implements OnInit {

  userownedbooks: Observable<Book[]>;
  userborrowedbooks: Observable<Book[]>;

  constructor(
    public authService: AuthService,
    public bookService: BookService,
  ) { }

  ngOnInit(
  ) {
    this.userownedbooks = this.bookService.getBooksByOwnerUid() as Observable<Book[]>;
    this.userborrowedbooks = this.bookService.getBooksByBorrowerUid() as Observable<Book[]>;
  }


}
