import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

// import { Observable, from } from 'rxjs';
// import { tap, map, take } from 'rxjs/operators';
// import { variable } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  router: any;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() { }

}
