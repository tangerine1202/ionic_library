import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  username: string;

  constructor(
    public authService: AuthService,
    public bookService: BookService,
  ) { }

  ngOnInit() {
    this.authService.user.subscribe((u) => {
      this.username = u.name;
      return;
    })
  }

}
