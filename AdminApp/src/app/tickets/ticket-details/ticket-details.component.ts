import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { TicketService } from '../ticket.service';
import { Ticket } from '../../Models/Ticket';
import { TicketType } from '../../Models/TicketType';
import { TicketTypeService } from '../ticket-types/ticket-type.service';
import { ConfirmActionDialogComponent } from '../../confirm-action-dialog/confirm-action-dialog.component';
import { ResponseModel } from '../../Models/ResponseModel';
import { TicketStatuses } from '../../Enums/TicketStatuses';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  ticketStatuses = TicketStatuses;
  types$: Observable<TicketType[]>;
  ticket: Ticket;
  ticketForm: FormGroup;
  message: string;

  constructor(private ticketService: TicketService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private ticketTypeService: TicketTypeService,
              private location: Location,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    const ticketId = +this.route.snapshot.paramMap.get('id');
    this.ticketService.getTicket(ticketId).subscribe(ticket => {
      this.ticket = ticket;
      this.ticketForm = this.formBuilder.group({
        id: this.ticket.id,
        flightId: this.ticket.flightId,
        ticketType: new FormControl(this.ticket.ticketType, Validators.required),
        price: new FormControl(this.ticket.price, Validators.required),
        ticketsLeftNumber: new FormControl(this.ticket.ticketsLeftNumber, Validators.required),
        status: new FormControl(this.ticket.status, Validators.required)
      });
      this.types$ = this.ticketTypeService.getTicketTypes();
    });
  }

  onSave(): void {
    if (this.ticketForm.valid) {
      this.openDialog('Are you sure that you want to save changes?');
    }
  }

  onDelete(): void {
    this.openDialog('Are you sure that you want to delete this ticket?');
  }

  openDialog(value: string): void {
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
      data: value
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === true) {
        switch (value) {
          case 'Are you sure that you want to save changes?': {
            this.save();
            break;
          }
          case 'Are you sure that you want to delete this ticket?': {
            this.delete();
            break;
          }
        }
      }
    });
  }

  save(): void {
    if (this.ticketForm.valid) {
      const ticket = this.ticketForm.value;
      this.ticketService.updateTicket(ticket)
        .subscribe(response => this.checkResult(response));
    }
  }

  delete(): void {
    this.ticketService.deleteTicket(this.ticket.id)
      .subscribe(response => this.checkResult(response));
  }


  checkResult(response: ResponseModel): void {
    if (!response.success) {
      this.message = response.message;
    } else {
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
