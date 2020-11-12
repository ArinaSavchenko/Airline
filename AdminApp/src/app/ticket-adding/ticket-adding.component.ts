import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';

import { TicketType } from '../Models/TicketType';
import { TicketService } from '../Services/ticket.service';
import { TicketTypeService } from '../Services/ticket-type.service';
import { TicketStatuses } from '../Enums/TicketStatuses';

@Component({
  selector: 'app-ticket-adding',
  templateUrl: './ticket-adding.component.html',
  styleUrls: ['./ticket-adding.component.css']
})
export class TicketAddingComponent implements OnInit {

  ticketStatuses = TicketStatuses;
  ticketForm: FormGroup;
  ticketTypes: TicketType[];
  flightId: number;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private ticketTypeService: TicketTypeService,
              private ticketService: TicketService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.flightId = +this.route.snapshot.paramMap.get('id');
    this.ticketForm = this.formBuilder.group({
      flightId: this.flightId,
      ticketTypeId: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      ticketsLeftNumber: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required)
    });
    this.ticketTypeService.getTicketTypes().subscribe(ticketTypes => {
      this.ticketTypes = ticketTypes.filter(ticketType => ticketType.status !== 'Delted');
    });
  }

  addTicket(): void {
    if (this.ticketForm.valid) {
      const ticket = this.ticketForm.value;
      this.ticketService.addTicket(ticket).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
