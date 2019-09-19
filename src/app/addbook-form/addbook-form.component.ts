import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';


@Component({
  selector: 'app-addbook-form',
  templateUrl: './addbook-form.component.html',
  styleUrls: ['./addbook-form.component.scss'],
})
export class AddbookFormComponent implements OnInit {
  newBook: Book;

  constructor() { }

  ngOnInit() {}

}
