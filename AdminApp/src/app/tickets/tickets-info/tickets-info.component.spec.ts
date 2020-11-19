import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsInfoComponent } from './tickets-info.component';

describe('TicketsInfoComponent', () => {
  let component: TicketsInfoComponent;
  let fixture: ComponentFixture<TicketsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
