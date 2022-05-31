import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryKeysComponent } from './recovery-keys.component';

describe('RecoveryKeysComponent', () => {
  let component: RecoveryKeysComponent;
  let fixture: ComponentFixture<RecoveryKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryKeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
