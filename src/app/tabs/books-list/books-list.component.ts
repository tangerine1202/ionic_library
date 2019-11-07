import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../model/book.model';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {

  @Input() listName: string;
  @Input() books: Observable<Book[]>;

  constructor(
    public bookService: BookService,
  ) { }

  ngOnInit() {
    this.books = this.books.pipe(
      map(books => {
          books.forEach(book => {
            this.bookService.getBookOwnerNameByBook(book).subscribe((ownerName) => {
              book.ownerName = ownerName;
            });
          });
          return books;
        }
      )
    );
  }
}
