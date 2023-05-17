import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MamRoutingModule } from './mam-routing.module';
import { MamComponent } from './mam.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MamComponent],
  imports: [CommonModule, MamRoutingModule, SharedModule],
})
export class MamModule {}
