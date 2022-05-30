import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    NavRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
  ],
  exports: [NavComponent],
})
export class NavModule {}
