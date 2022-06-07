import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMfaComponent } from './remove-mfa.component';

describe('RemoveMfaComponent', () => {
  let component: RemoveMfaComponent;
  let fixture: ComponentFixture<RemoveMfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveMfaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
