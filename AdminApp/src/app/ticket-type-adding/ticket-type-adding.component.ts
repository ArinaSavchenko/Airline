import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { TicketTypeService } from '../Services/ticket-type.service';
import { RefundTypes } from '../Enums/RefundTypes';
import { SeatTypes } from '../Enums/SeatTypes';

@Component({
  selector: 'app-ticket-type-adding',
  templateUrl: './ticket-type-adding.component.html',
  styleUrls: ['./ticket-type-adding.component.css']
})
export class TicketTypeAddingComponent {

  refundTypes = RefundTypes;
  seatTypes = SeatTypes;
  ticketTypeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private ticketTypeService: TicketTypeService,
              private location: Location) {
    this.ticketTypeForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      carryOnBagsNumber: new FormControl(0, [Validators.required, Validators.min(0)]),
      carryOnBagMaxWeight: new FormControl(0, [Validators.required, Validators.min(0)]),
      baggageNumber: new FormControl(0, [Validators.required, Validators.min(0)]),
      baggageMaxWeight: new FormControl(0, [Validators.required, Validators.min(0)]),
      pricePerExtraCarryOnBag: new FormControl(0, [Validators.required, Validators.min(0)]),
      pricePerExtraCarryOnBagKg: new FormControl(0, [Validators.required, Validators.min(0)]),
      pricePerExtraBaggage: new FormControl(0, [Validators.required, Validators.min(0)]),
      pricePerExtraBaggageKg: new FormControl(0, [Validators.required, Validators.min(0)]),
      seatReservation: new FormControl(false, [Validators.required]),
      changes: new FormControl(false, Validators.required),
      refund: new FormControl(null, Validators.required),
      seatType: new FormControl(null, Validators.required)
    });
  }

  addTicketType(): void {
    const ticketType = this.ticketTypeForm.value;
    this.ticketTypeService.addTicketType(ticketType).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
