import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneAddingComponent } from './airplane-adding.component';

describe('AirplaneAddingComponent', () => {
  let component: AirplaneAddingComponent;
  let fixture: ComponentFixture<AirplaneAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirplaneAddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
