import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportAddingComponent } from './airport-adding.component';

describe('AirportAddingComponent', () => {
  let component: AirportAddingComponent;
  let fixture: ComponentFixture<AirportAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportAddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
