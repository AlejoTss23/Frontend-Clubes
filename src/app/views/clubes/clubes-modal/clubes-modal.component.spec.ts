import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubesModalComponent } from './clubes-modal.component';

describe('ClubesModalComponent', () => {
  let component: ClubesModalComponent;
  let fixture: ComponentFixture<ClubesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
