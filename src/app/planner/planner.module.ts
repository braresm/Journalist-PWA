import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { PlannerRoutingModule } from './planner-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { PlannerComponent } from './planner.component';
import { AddPlannerItemComponent } from './components/add-planner-item/add-planner-item.component';
import { PlannerItemComponent } from './components/planner-item/planner-item.component';

@NgModule({
  declarations: [PlannerComponent, AddPlannerItemComponent, PlannerItemComponent],
  imports: [CommonModule, PlannerRoutingModule, SharedModule],
})
export class PlannerModule {}
