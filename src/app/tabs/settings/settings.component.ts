import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularDelegate } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  darkThemeToggle: boolean;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() { }

  darkMode() {
    document.body.classList.toggle('dark');
  }

}
