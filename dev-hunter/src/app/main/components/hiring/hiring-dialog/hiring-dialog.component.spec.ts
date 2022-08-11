import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringDialogComponent } from './hiring-dialog.component';

describe('HiringDialogComponent', () => {
  let component: HiringDialogComponent;
  let fixture: ComponentFixture<HiringDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiringDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
