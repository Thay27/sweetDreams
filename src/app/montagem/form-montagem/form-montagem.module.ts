import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormMontagemPageRoutingModule } from './form-montagem-routing.module';

import { FormMontagemPage } from './form-montagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormMontagemPageRoutingModule
  ],
  declarations: [FormMontagemPage]
})
export class FormMontagemPageModule {}
