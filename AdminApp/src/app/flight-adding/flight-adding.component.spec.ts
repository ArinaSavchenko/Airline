import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightAddingComponent } from './flight-adding.component';

describe('FlightAddingComponent', () => {
  let component: FlightAddingComponent;
  let fixture: ComponentFixture<FlightAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightAddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
