import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.scss'],
})
export class BookShelfComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public bookService: BookService,
  ) { }

  ngOnInit() {}

}
