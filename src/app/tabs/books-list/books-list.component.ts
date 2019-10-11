import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../model/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {

  @Input() listName: string;
  @Input() books: Observable<Book[]>;

  constructor(
    // public authService: AuthService,
    // public bookService: BookService,
  ) { }

  ngOnInit() { }

}
