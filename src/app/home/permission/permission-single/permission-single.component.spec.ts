import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionSingleComponent } from './permission-single.component';

describe('PermissionSingleComponent', () => {
  let component: PermissionSingleComponent;
  let fixture: ComponentFixture<PermissionSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
