import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AirplaneService } from '../airplane.service';
import { AirplaneStatuses } from '../../Enums/AirplaneStatuses';

@Component({
  selector: 'app-airplane-adding',
  templateUrl: './airplane-adding.component.html',
  styleUrls: ['./airplane-adding.component.css']
})
export class AirplaneAddingComponent {

  airplaneStatuses = AirplaneStatuses;
  airplaneForm: FormGroup;
  nameFormat = '[a-zA-Z\s]+$';

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
      const airplane = this.airplaneForm.value;
      this.airplaneService.addAirplane(airplane).subscribe((newAirplaneId) => this.router.navigate(
        ['admin/airplane/seats-scheme/' + newAirplaneId]));
    }
  }
}
