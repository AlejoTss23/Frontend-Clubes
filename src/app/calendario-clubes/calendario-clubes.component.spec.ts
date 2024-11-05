import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioClubesComponent } from './calendario-clubes.component';

describe('CalendarioClubesComponent', () => {
  let component: CalendarioClubesComponent;
  let fixture: ComponentFixture<CalendarioClubesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioClubesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioClubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
