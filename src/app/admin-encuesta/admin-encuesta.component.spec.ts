import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEncuestaComponent } from './admin-encuesta.component';

describe('AdminEncuestaComponent', () => {
  let component: AdminEncuestaComponent;
  let fixture: ComponentFixture<AdminEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEncuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
