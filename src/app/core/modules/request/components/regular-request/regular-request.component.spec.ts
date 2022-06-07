import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularRequestComponent } from './regular-request.component';

describe('RegularRequestComponent', () => {
  let component: RegularRequestComponent;
  let fixture: ComponentFixture<RegularRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
