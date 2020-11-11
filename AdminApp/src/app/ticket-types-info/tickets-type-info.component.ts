import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TicketType } from '../Models/TicketType';
import { TicketTypeService } from '../Services/ticket-type.service';

@Component({
  selector: 'app-tickets-type-info',
  templateUrl: './ticket-types-info.component.html',
  styleUrls: ['./ticket-types-info.component.css']
})
export class TicketsTypeInfoComponent implements OnInit {

  ticketTypes$: Observable<TicketType[]>;

  constructor(private ticketTypeService: TicketTypeService) {
  }

  ngOnInit(): void {
    this.ticketTypes$ = this.ticketTypeService.getTicketTypes();
  }

}
