import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../shared/produtos.service';
import { ToastService } from 'src/app/core/shared/toast.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  produtos: Observable<any[]>;
  categorias: Observable<any[]>;
  categoriaSelecionada: string;
  carrinhoPossuiItens: boolean = false;

  constructor(private router: Router,
              private produtosService: ProdutosService,
              private afAuth: AngularFireAuth,
              private toast: ToastService,) { }

  ngOnInit() {
    this.produtos = this.produtosService.getAll(null);
    this.categorias = this.produtosService.getCategoriasAll();
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
  
  buscarProdutos(){
    this.produtos = this.produtosService.getAll(this.categoriaSelecionada);
  }

  adicionarProduto(produtoKey: string) {
    this.router.navigate(['/carrinho/novo-item/', produtoKey]);
  }

}
