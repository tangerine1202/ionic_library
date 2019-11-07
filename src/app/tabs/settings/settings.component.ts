import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  // darkThemeToggle: boolean;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
    // // Query for the toggle that is used to change between themes
    // // tslint:disable-next-line: member-ordering
    // const toggle = document.querySelector('#themeToggle');

    // // Listen for the toggle check/uncheck to toggle the dark class on the <body>
    // toggle.addEventListener('ionChange', (ev) => {
    //   document.body.classList.toggle('dark', ev.checked);
    // });

    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // // Listen for changes to the prefers-color-scheme media query
    // prefersDark.addListener((e) => checkToggle(e.matches));

    // // Called when the app loads
    // function loadApp() {
    //   checkToggle(prefersDark.matches);
    // }

    // // Called by the media query to check/uncheck the toggle
    // function checkToggle(shouldCheck) {
    //   toggle.checked = shouldCheck;
    // }
  }

  // darkMode() {
  //   document.body.classList.toggle('dark');
  // }

  themeToggle(ev) {
    // Listen for the toggle check/uncheck to toggle the dark class on the <body>
    document.body.classList.toggle('dark', ev.checked);

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((e) => checkToggle(e.matches));

    // Called when the app loads
    function loadApp() {
      checkToggle(prefersDark.matches);
    }

    // Called by the media query to check/uncheck the toggle
    function checkToggle(shouldCheck) {
      document.body.classList.toggle('dark', shouldCheck);
    }
  }



}
