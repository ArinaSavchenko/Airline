import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Airplane } from '../Models/Airplane';
import { AirplaneService } from '../Services/airplane.service';

@Component({
  selector: 'app-airplane-adding',
  templateUrl: './airplane-adding.component.html',
  styleUrls: ['./airplane-adding.component.css']
})
export class AirplaneAddingComponent {

  status: string;
  statuses = ['Active', 'Closed', 'Temporary closed'];
  airplaneForm: FormGroup;
  nameFormat = '[a-zA-Z\s]+$';
  message: string;

  constructor(private formBuilder: FormBuilder,
              private airplaneService: AirplaneService,
              private location: Location,
              private router: Router
  ) {
    this.airplaneForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      seatsNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
      maxWeight: new FormControl(null, [Validators.required, Validators.min(400)]),
      status: new FormControl(null, Validators.required)
    });
  }

  onFormSubmit(): void {
    if (this.airplaneForm.valid) {
      const airplane: Airplane = {
        name: this.airplaneForm.controls.name.value,
        seatsNumber: this.airplaneForm.controls.seatsNumber.value,
        maxWeight: this.airplaneForm.controls.maxWeight.value,
        status: this.airplaneForm.controls.status.value
      };
      this.airplaneService.addAirplane(airplane).subscribe((newAirplaneId) => this.router.navigate(
          ['admin/airplane/seats-scheme/' + newAirplaneId]));
    }
  }

  goBack(): void {
    this.location.back();
  }
}
