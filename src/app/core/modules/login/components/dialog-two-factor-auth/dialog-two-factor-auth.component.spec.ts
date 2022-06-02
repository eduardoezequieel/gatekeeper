import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTwoFactorAuthComponent } from './dialog-two-factor-auth.component';

describe('DialogTwoFactorAuthComponent', () => {
  let component: DialogTwoFactorAuthComponent;
  let fixture: ComponentFixture<DialogTwoFactorAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTwoFactorAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTwoFactorAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
