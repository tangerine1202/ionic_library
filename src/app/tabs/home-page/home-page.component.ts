import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/model/book.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  allbooks: Observable<Book[]>;

  constructor(
    public authService: AuthService,
    public bookService: BookService,
  ) { }

  ngOnInit() {
    this.allbooks = this.bookService.getAllBooks() as Observable<Book[]>;
  }

}
