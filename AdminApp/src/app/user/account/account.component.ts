import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ResponseModel } from '../../Models/ResponseModel';
import { User } from '../../Models/User';
import { ConfirmActionDialogComponent } from '../../confirm-action-dialog/confirm-action-dialog.component';
import { UserService } from '../user.service';

@Component( {
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
} )
export class AccountComponent implements OnInit {

  user: User;
  message: string;

  constructor(private router: Router,
              public dialog: MatDialog,
              public userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe( user => this.user = user );
  }

  logOut(): void {
    this.userService.logOut();
    this.goToTheMainPage();
  }

  delete(): void {
    const message = `Are you sure you want to delete your account?`;

    const dialogRef = this.dialog.open( ConfirmActionDialogComponent, {
      data: message
    } );

    dialogRef.afterClosed().subscribe( dialogResult => {
      if (dialogResult === true) {
        this.userService.deleteUser( this.user.id ).subscribe( response => this.checkResult( response ) );
      }
    } );
  }

  checkResult(response: ResponseModel): void {
    if (!response.success) {
      this.message = response.message;
    }
    else {
      this.userService.logOut();
      this.goToTheMainPage();
    }
  }

  goToTheMainPage(): void {
    this.router.navigate( [''] );
  }
}
