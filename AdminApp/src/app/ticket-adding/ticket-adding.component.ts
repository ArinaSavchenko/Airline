import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketTypeService } from '../Services/ticket-type.service';
import { Observable } from 'rxjs';
import { TicketType } from '../Models/TicketType';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-adding',
  templateUrl: './ticket-adding.component.html',
  styleUrls: ['./ticket-adding.component.css']
})
export class TicketAddingComponent implements OnInit {

  statuses = ['Sold out', 'Available'];
  ticketForm: FormGroup;
  types$: Observable<TicketType[]>;
  flightId: number;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private ticketTypeService: TicketTypeService) { }

  ngOnInit(): void {
    this.flightId = +this.route.snapshot.paramMap.get('flightId');
    this.ticketForm = this.formBuilder.group({
      flightId: this.flightId,
      typeId: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required)
    });
    this.types$ = this.ticketTypeService.getTicketTypes();
  }

  addTicket(): void {
    if (this.ticketForm.valid) {
      const ticket = this.ticketForm.value;
      console.log(ticket);
    }
  }
}
