import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimeCodeComponent } from './one-time-code.component';

describe('OneTimeCodeComponent', () => {
  let component: OneTimeCodeComponent;
  let fixture: ComponentFixture<OneTimeCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTimeCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimeCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
