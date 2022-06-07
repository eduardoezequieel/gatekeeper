import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AproveRequestComponent } from './aprove-request.component';

describe('AproveRequestComponent', () => {
  let component: AproveRequestComponent;
  let fixture: ComponentFixture<AproveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AproveRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AproveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
