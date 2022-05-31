import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWithRCodeComponent } from './auth-with-r-code.component';

describe('AuthWithRCodeComponent', () => {
  let component: AuthWithRCodeComponent;
  let fixture: ComponentFixture<AuthWithRCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthWithRCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthWithRCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
