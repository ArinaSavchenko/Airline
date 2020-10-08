import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent{

  constructor(private dialog: MatDialog) {}

  openLogInForm(): void {
    this.dialog.open(LogInComponent, {
      width: '37em',
      height: '27em'
    });
  }
}
