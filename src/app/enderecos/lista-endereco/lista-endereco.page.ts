import { EnderecoService } from './../shared/endereco.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/shared/toast.service';
import { AlertService } from 'src/app/core/shared/alert.service';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-lista-endereco',
  templateUrl: './lista-endereco.page.html',
  styleUrls: ['./lista-endereco.page.scss'],
})
export class ListaEnderecoPage implements OnInit {

  enderecos: Observable<any[]>;
  @Input()
  selecionarEndereco: boolean = false;
  endereco: any = {};

  constructor(private enderecoService: EnderecoService, 
              private afAuth: AngularFireAuth,
              private alert: AlertService,
              private toast: ToastService,
              private router: Router,
              private modalConttroller: ModalController,
              ) { }

  ngOnInit() {
    this.endereco = this.enderecoService.getDadosEndereco();
  }

  getEnderecoText(endereco: any) {
    let enderecoText: '';
    enderecoText = endereco.rua;
    enderecoText += ', '+ endereco.numero;
    if (endereco.complemento) {
      enderecoText += ', ' + endereco.complemento;
    }
    enderecoText += ' - ' + endereco.bairro;
    enderecoText += ' - ' + endereco.cep; 
    if (endereco.referencia) {
    enderecoText += ' - ' + endereco.referencia; 
    }

    return enderecoText;
  }

  editar(key: string){
    this.router.navigate(['/enderecos/editar', key]);
  }
  
  remover(endereco: any){
    this.alert.ShowConfirmaExclusao('Endereco', () => {
      this.enderecoService.remove("key")
      .then(() => {
        this.toast.show('Endereço removido com sucesso!!');
      })
    })
  }

  setEnderecoSelecionado(endereco: any){
    if (this.selecionarEndereco) {
      const enderecoText = this.getEnderecoText(endereco);
      this.modalConttroller.dismiss({ endereco: enderecoText })
    }
  }
  
  comprar() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (!user) {
        this.toast.show('Por favor, efetue o login para acessar o carrinho');
      } else {
       this.router.navigate(['/carrinho']);
      }
    })
  
  }
  
  
  logar() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (!user) {
        this.router.navigate(['/login'])
      } else {
       this.router.navigate(['/perfil']);
      }
    })
  }
}
