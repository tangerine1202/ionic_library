import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public bookService: BookService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {}

  // showDetail(uid: string) {
  //   const book = this.bookService.getBookByUid(uid);
  // }
}
