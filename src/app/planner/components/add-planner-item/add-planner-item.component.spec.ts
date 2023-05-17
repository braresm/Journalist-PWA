import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlannerItemComponent } from './add-planner-item.component';

describe('AddPlannerItemComponent', () => {
  let component: AddPlannerItemComponent;
  let fixture: ComponentFixture<AddPlannerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlannerItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlannerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
