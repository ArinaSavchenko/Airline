import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsInfoComponent } from './airports-info.component';

describe('AirportsComponent', () => {
  let component: AirportsInfoComponent;
  let fixture: ComponentFixture<AirportsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
