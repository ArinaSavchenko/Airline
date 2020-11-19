import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAddingComponent } from './ticket-adding.component';

describe('TicketAddingComponent', () => {
  let component: TicketAddingComponent;
  let fixture: ComponentFixture<TicketAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
