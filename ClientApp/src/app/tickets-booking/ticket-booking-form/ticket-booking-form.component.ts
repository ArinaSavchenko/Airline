import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Ticket } from '../../Models/Ticket';
import { NewBookedTicket } from '../../Models/NewBookedTIcket';
import { TicketsService } from '../tickets.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-ticket-booking-form',
  templateUrl: './ticket-booking-form.component.html',
  styleUrls: ['./ticket-booking-form.component.css']
})
export class TicketBookingFormComponent implements OnInit {

  @Input() ticketId: number;
  @Output() saveTicket = new EventEmitter<NewBookedTicket>();
  @Output() changeTicket = new EventEmitter<NewBookedTicket>();
  userId: number;
  ticket: Ticket;
  bookedTicketForm: FormGroup;
  nameFormat = '[a-zA-Z\s]+$';
  totalTicketPrice: number;
  saved = false;
  passportFormat = '^[A-Z0-9]+$';
  luggageNumberFormat = '^[0-9]+$';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private ticketService: TicketsService) {
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.ticketService.getTicket(this.ticketId).subscribe(ticket => {
      this.ticket = ticket;
      this.totalTicketPrice = this.ticket.price;
      this.bookedTicketForm = this.formBuilder.group({
        ticketId: this.ticketId,
        userId: this.userId,
        passengerFirstName: new FormControl(null, [Validators.required, Validators.pattern(this.nameFormat)]),
        passengerLastName: new FormControl(null, [Validators.required, Validators.pattern(this.nameFormat)]),
        passport: new FormControl(null, [Validators.required, Validators.pattern(this.passportFormat)]),
        carryOnBagsNumber: new FormControl(0, [Validators.required, Validators.min(0),
          Validators.pattern(this.luggageNumberFormat)]),
        baggageNumber: new FormControl(0, [Validators.required, Validators.min(0),
          Validators.pattern(this.luggageNumberFormat)]),
        totalPrice: this.totalTicketPrice,
        status: 'Active'
      });
    });
  }

  luggageNumberChanged(): void {
    this.totalTicketPrice = this.ticket.price;

    if (this.bookedTicketForm.controls.carryOnBagsNumber.value > this.ticket.ticketType.carryOnBagsNumber) {
      this.totalTicketPrice += (this.bookedTicketForm.controls.carryOnBagsNumber.value - this.ticket.ticketType.carryOnBagsNumber)
        * this.ticket.ticketType.pricePerExtraCarryOnBag;
    }

    if (this.bookedTicketForm.controls.baggageNumber.value > this.ticket.ticketType.baggageNumber) {
      this.totalTicketPrice += (this.bookedTicketForm.controls.baggageNumber.value - this.ticket.ticketType.baggageNumber)
        * this.ticket.ticketType.pricePerExtraBaggage;
    }

    this.bookedTicketForm.controls.totalPrice.setValue(this.totalTicketPrice);
  }

  onSaveTicket(): void {
    if (this.bookedTicketForm.valid) {
      this.saveTicket.emit(this.bookedTicketForm.value);
      this.saved = true;
    }
  }

  change(): void {
    this.saved = false;
    this.changeTicket.emit(this.bookedTicketForm.value);
  }
}
