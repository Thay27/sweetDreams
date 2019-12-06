import { MontagemService } from './../shared/montagem.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-montagem',
  templateUrl: './form-montagem.page.html',
  styleUrls: ['./form-montagem.page.scss'],
})
export class FormMontagemPage implements OnInit {
  montagem: any;

  constructor(private itensMontagem: MontagemService) { }

  ngOnInit() {
      // this.montagem = this.itensMontagem.getItensMontagem();
    }
  
  }

