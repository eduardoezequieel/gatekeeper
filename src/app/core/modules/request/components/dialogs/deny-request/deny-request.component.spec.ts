import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyRequestComponent } from './deny-request.component';

describe('DenyRequestComponent', () => {
  let component: DenyRequestComponent;
  let fixture: ComponentFixture<DenyRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenyRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
