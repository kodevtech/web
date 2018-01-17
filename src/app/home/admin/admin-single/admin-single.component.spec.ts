import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleComponent } from './admin-single.component';

describe('AdminSingleComponent', () => {
  let component: AdminSingleComponent;
  let fixture: ComponentFixture<AdminSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
