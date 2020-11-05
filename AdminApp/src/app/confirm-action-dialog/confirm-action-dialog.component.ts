import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AirportDetailsComponent } from '../airport-details/airport-details.component';

@Component({
    selector: 'app-confirm-action-dialog',
    templateUrl: './confirm-action-dialog.component.html',
    styleUrls: ['./confirm-action-dialog.component.css']
})
export class ConfirmActionDialogComponent {

    event: boolean;
    action: any;

    constructor(
        public dialogRef: MatDialogRef<AirportDetailsComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: string) {
        this.action = data;
    }

    doAction(): any {
        this.dialogRef.close({event: true});
    }

    closeDialog(): any {
        this.dialogRef.close({event: false});
    }
}
