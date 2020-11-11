import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsTypeInfoComponent } from './tickets-type-info.component';

describe('TicketsTypeInfoComponent', () => {
  let component: TicketsTypeInfoComponent;
  let fixture: ComponentFixture<TicketsTypeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsTypeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
