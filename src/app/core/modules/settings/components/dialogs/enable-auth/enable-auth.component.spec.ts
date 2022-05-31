import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableAuthComponent } from './enable-auth.component';

describe('EnableAuthComponent', () => {
  let component: EnableAuthComponent;
  let fixture: ComponentFixture<EnableAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
