import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormMontagemPage } from './form-montagem.page';

const routes: Routes = [
  {
    path: '',
    component: FormMontagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormMontagemPageRoutingModule {}
