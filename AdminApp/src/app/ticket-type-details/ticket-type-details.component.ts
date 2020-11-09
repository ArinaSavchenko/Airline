import { Component, OnInit } from '@angular/core';
import { TicketTypeService } from '../Services/ticket-type.service';
import { TicketType } from '../Models/TicketType';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-type-details',
  templateUrl: './ticket-type-details.component.html',
  styleUrls: ['./ticket-type-details.component.css']
})
export class TicketTypeDetailsComponent implements OnInit {

  refundTypes = ['Full refund', 'Refund for fee', 'Partial refund'];
  seatTypes = ['Business', 'Standard'];
  ticketType: TicketType;

  constructor(private route: ActivatedRoute,
              private ticketTypeService: TicketTypeService) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ticketTypeService.getTicketType(id).subscribe(ticketType => this.ticketType = ticketType);
  }

  updateTicketType(): void {
    this.ticketTypeService.updateTicketType(this.ticketType).subscribe();
  }

  deleteTicketType(): void {
    this.ticketTypeService.deleteTicket(this.ticketType.id).subscribe();
  }
}
