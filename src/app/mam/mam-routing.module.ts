import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MamComponent } from './mam.component';

const routes: Routes = [{ path: '', component: MamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MamRoutingModule { }
