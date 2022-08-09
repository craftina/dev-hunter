import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperEditComponent } from './developer-edit.component';

describe('DeveloperEditComponent', () => {
  let component: DeveloperEditComponent;
  let fixture: ComponentFixture<DeveloperEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
