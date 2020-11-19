import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsSchemeComponent } from './seats-scheme.component';

describe('SeatsSchemeComponent', () => {
  let component: SeatsSchemeComponent;
  let fixture: ComponentFixture<SeatsSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatsSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
