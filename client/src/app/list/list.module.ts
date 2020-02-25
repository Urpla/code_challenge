import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { RouterModule } from '@angular/router';

export const ROUTES = [{ path: '', component: ListComponent }];


@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)]
})
export class ListModule {}
