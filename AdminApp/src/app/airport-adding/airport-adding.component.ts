import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Airport } from '../Models/Airport';
import { AirportService } from '../Services/airport.service';

@Component({
  selector: 'app-airport-adding',
  templateUrl: './airport-adding.component.html',
  styleUrls: ['./airport-adding.component.css']
})
export class AirportAddingComponent {

  airportForm: FormGroup;
  nameFormat = '[a-zA-Z\s]+$';
  message: string;

  constructor(private formBuilder: FormBuilder,
              private airportService: AirportService,
              private location: Location
              ) {
    this.airportForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required, Validators.pattern(this.nameFormat)]),
      country: new FormControl(null, [Validators.required, Validators.pattern(this.nameFormat)]),
    });
  }

  onFormSubmit(): void {
    if (this.airportForm.valid) {
      const airport: Airport = {
        name: this.airportForm.controls.name.value,
        city: this.airportForm.controls.city.value,
        country: this.airportForm.controls.country.value
      };
      this.airportService.addAirport(airport).subscribe();
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
