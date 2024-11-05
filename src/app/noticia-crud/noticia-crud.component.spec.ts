import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaCrudComponent } from './noticia-crud.component';

describe('NoticiaCrudComponent', () => {
  let component: NoticiaCrudComponent;
  let fixture: ComponentFixture<NoticiaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
