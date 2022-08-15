import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiredComponent } from './hired.component';

describe('HiredComponent', () => {
  let component: HiredComponent;
  let fixture: ComponentFixture<HiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
