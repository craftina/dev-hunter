import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperProfileComponent } from './developer-profile.component';

describe('DeveloperProfileComponent', () => {
  let component: DeveloperProfileComponent;
  let fixture: ComponentFixture<DeveloperProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
