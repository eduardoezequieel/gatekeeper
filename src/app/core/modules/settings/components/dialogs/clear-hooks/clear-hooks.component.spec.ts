import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearHooksComponent } from './clear-hooks.component';

describe('ClearHooksComponent', () => {
  let component: ClearHooksComponent;
  let fixture: ComponentFixture<ClearHooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearHooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearHooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
