import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  // TODO: component will reinit when I do [previous page] then [next page].
  // so themeToggle should be placed where won't be reinit, until I leave the website.
  themeToggle: any = false;

  constructor(
    public authService: AuthService,
  ) { }

  // Called by the media query to check/uncheck the toggle
  checkToggle(shouldCheck) {
    console.log('checked: ', shouldCheck);
    document.body.classList.toggle('dark', shouldCheck);
  }

  ngOnInit() {
    console.log('setting reinit');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Listen for changes to the prefers-color-scheme media query
    this.themeToggle = prefersDark.matches;

    // Called when the app loads
    // function loadApp() {
    this.checkToggle(prefersDark.matches);
    // }

  }

  themeToggleFn(ev) {
    console.log(ev);
    // Listen for the toggle check/uncheck to toggle the dark class on the <body>
    this.checkToggle(ev.detail.checked);
  }



}
