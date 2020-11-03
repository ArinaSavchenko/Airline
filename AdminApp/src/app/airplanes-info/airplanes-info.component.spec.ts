import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanesInfoComponent } from './airplanes-info.component';

describe('AirplanesComponent', () => {
  let component: AirplanesInfoComponent;
  let fixture: ComponentFixture<AirplanesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirplanesInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplanesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
