import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaPublicaComponent } from './encuesta-publica.component';

describe('EncuestaPublicaComponent', () => {
  let component: EncuestaPublicaComponent;
  let fixture: ComponentFixture<EncuestaPublicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuestaPublicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaPublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
