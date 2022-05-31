import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableAuthComponent } from './disable-auth.component';

describe('DisableAuthComponent', () => {
  let component: DisableAuthComponent;
  let fixture: ComponentFixture<DisableAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisableAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
