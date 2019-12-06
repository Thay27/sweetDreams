import { ToastService } from './../../core/shared/toast.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MontagemService } from '../shared/montagem.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { CarrinhoService } from 'src/app/carrinho/shared/carrinho.service';

@Component({
  selector: 'app-lista-montagem',
  templateUrl: './lista-montagem.page.html',
  styleUrls: ['./lista-montagem.page.scss'],
})

export class ListaMontagemPage implements OnInit {
  massa: Observable<any[]>;
  recheio: Observable<any[]>;
  cobertura: Observable<any[]>;
  decoracao: Observable<any[]>;
  peso: Observable<any[]>;
  total: number;
  preco: number;

    categorias: Observable<any[]>;
    categoriaSelecionada: string;
    formCriarPedido: FormGroup;
    carrinhoPossuiItens: boolean = false;
    montagemOp: any[];
  
    constructor(private router: Router,
                private montagemService: MontagemService,
                private afAuth: AngularFireAuth,
                private toast: ToastService,
                private itensService: MontagemService,
                private formBuilder: FormBuilder,
                private db: AngularFireDatabase) { }

  ngOnInit() {
    this.massa = this.montagemService.getOpcoes('Massa');
    this.recheio = this.montagemService.getOpcoes('Recheio');
    this.cobertura = this.montagemService.getOpcoes('Cobertura');
    this.decoracao = this.montagemService.getOpcoes('Decoração');
    this.peso = this.montagemService.getOpcoes('Peso');
    this.criarFormulario();
    // this.executaCalcularTotal();

  }

  // get montagemDecoracao() { return this.formCriarPedido.get('montagemDecoracao'); }
  // get montagemCobertura() { return this.formCriarPedido.get('montagemCobertura'); }
  // get montagemRecheio() { return this.formCriarPedido.get('montagemRecheio'); }
  // get montagemPeso() { return this.formCriarPedido.get('montagemPeso'); }
  // get montagemMassa() { return this.formCriarPedido.get('montagemMassa'); }



  criarFormulario(){
    this.formCriarPedido = this.formBuilder.group({
      montagemDecoracao: [''],
      montagemCobertura: [''],
      montagemRecheio: [''],
      montagemPeso: [''],
      montagemMassa: [''],
    })
  }

  // executaCalcularTotal(){
  //   this.atualizaTotal(this.formCriarPedido.value.massa);
  // }

  // atualizaTotal(montagem: number){
  //   this.total = this.massa.preco * montagem;
  //   this.formCriarPedido.patchValue({montagem: montagem, total: this.total});
  // }


  onSubmit(){
    if (this.formCriarPedido.valid) {
      this.itensService.insert(this.formCriarPedido.value)
        .then( () => {
          this.toast.show('Produto criado com sucesso !!!');
          this.router.navigate(['/carrinho']);
        })
    }
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
  comprar() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (!user) {
        this.toast.show('Por favor, efetue o login para acessar o carrinho');
      } else {
       this.router.navigate(['/carrinho']);
      }
    })
  
  }

}

