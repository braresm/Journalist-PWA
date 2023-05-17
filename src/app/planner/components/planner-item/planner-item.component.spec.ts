import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerItemComponent } from './planner-item.component';

describe('PlannerItemComponent', () => {
  let component: PlannerItemComponent;
  let fixture: ComponentFixture<PlannerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
