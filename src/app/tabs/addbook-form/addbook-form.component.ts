import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../model/book.model';

@Component({
  selector: 'app-addbook-form',
  templateUrl: './addbook-form.component.html',
  styleUrls: ['./addbook-form.component.scss'],
})
export class AddbookFormComponent implements OnInit {
  addedBook = new Book(null, null, null, null);

  constructor(
    private bookService: BookService,
    private authService: AuthService,
  ) { }

  ngOnInit() { }

  onSubmit() {
    if (this.authService.userData.uid !== null) {
      this.addedBook.ownerUid = this.authService.userData.uid;
      // form have binded to addedBook, so doesn't need to get value again.
      this.bookService.addBook(this.addedBook);
    } else {
      console.log('Please submit the form later. Or login first.');
    }
  }

  // Testing function
  get diagnostic() { return this.addedBook; }

  // getUser() {
  //   this.authService.user.subscribe((u) => {
  //     this. = u.name;
  //     return;
  //   });
  // }

}
