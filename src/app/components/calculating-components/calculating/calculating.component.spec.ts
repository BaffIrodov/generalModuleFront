import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatingComponent } from './calculating.component';

describe('CalculatingComponent', () => {
  let component: CalculatingComponent;
  let fixture: ComponentFixture<CalculatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
