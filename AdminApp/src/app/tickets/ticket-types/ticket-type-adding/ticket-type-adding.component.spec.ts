import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTypeAddingComponent } from './ticket-type-adding.component';

describe('TicketTypeAddingComponent', () => {
  let component: TicketTypeAddingComponent;
  let fixture: ComponentFixture<TicketTypeAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTypeAddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTypeAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
