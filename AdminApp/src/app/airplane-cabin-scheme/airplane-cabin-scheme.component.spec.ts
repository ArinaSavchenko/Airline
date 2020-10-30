import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneCabinSchemeComponent } from './airplane-cabin-scheme.component';

describe('AirplaneCabinSchemeComponent', () => {
  let component: AirplaneCabinSchemeComponent;
  let fixture: ComponentFixture<AirplaneCabinSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirplaneCabinSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneCabinSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
