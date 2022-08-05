import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyEditComponent } from './technology-edit.component';

describe('TechnologyEditComponent', () => {
  let component: TechnologyEditComponent;
  let fixture: ComponentFixture<TechnologyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
