import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodedelarouteComponent } from './codedelaroute.component';

describe('CodedelarouteComponent', () => {
  let component: CodedelarouteComponent;
  let fixture: ComponentFixture<CodedelarouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodedelarouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodedelarouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
