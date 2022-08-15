import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiredCardComponent } from './hired-card.component';

describe('HiredCardComponent', () => {
  let component: HiredCardComponent;
  let fixture: ComponentFixture<HiredCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiredCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiredCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
