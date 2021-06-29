import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisdeconduireComponent } from './permisdeconduire.component';

describe('PermisdeconduireComponent', () => {
  let component: PermisdeconduireComponent;
  let fixture: ComponentFixture<PermisdeconduireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisdeconduireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisdeconduireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
