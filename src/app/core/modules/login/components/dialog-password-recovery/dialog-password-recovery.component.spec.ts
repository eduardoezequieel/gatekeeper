import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPasswordRecoveryComponent } from './dialog-password-recovery.component';

describe('DialogPasswordRecoveryComponent', () => {
  let component: DialogPasswordRecoveryComponent;
  let fixture: ComponentFixture<DialogPasswordRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPasswordRecoveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPasswordRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
