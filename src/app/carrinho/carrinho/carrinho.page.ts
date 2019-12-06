import { AlertService } from './../../core/shared/alert.service';
import { CarrinhoService } from './../shared/carrinho.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/produtos/shared/produtos.service';
import { MontagemService } from 'src/app/montagem/shared/montagem.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
itensPedido: Observable<any[]>;
total: number;
produtos: Observable<any[]>;
itens: Observable<any[]>;

  constructor(private carrinhoService: CarrinhoService,
              private alert: AlertService,
              private produtosService: ProdutosService,
              private montagemService: MontagemService) { }

  ngOnInit() {
    this.itensPedido = this.carrinhoService.getAll();
    this.produtos = this.produtosService.getAll(null);
    this.itens = this.montagemService.getAll(null);
    // this.massa = this.montagemService.getOpcoes('Massa');
    // this.recheio = this.montagemService.getOpcoes('Recheio');
    // this.cobertura = this.montagemService.getOpcoes('Cobertura');
    // this.decoracao = this.montagemService.getOpcoes('Decoração');
    // this.peso = this.montagemService.getOpcoes('Peso');


    this.getTotalPedido();
  }

  getTotalPedido() {
    const subscribe = this.carrinhoService.getTotalPedido().subscribe( (total: number) => {
      subscribe.unsubscribe();
      this.total = total;
    })
  }

  adicionarQuantidade(itemPedido: any){
    let qtd = itemPedido.quantidade;
    qtd++;

    this.atualizarTotal(itemPedido, qtd);
  }

  removerQuantidade(itemPedido: any) {
    let qtd = itemPedido.quantidade;
    qtd--;

    if (qtd <=0){
      this.removerProduto(itemPedido);
    } else {
      this.atualizarTotal(itemPedido, qtd);
    }
  }

  removerQuantidadeItens(itemMontagem: any) {
    let qtd = itemMontagem.quantidade;
    qtd--;

    if (qtd <=0){
      this.removerProdutoMontagem(itemMontagem);
    } else {
      this.atualizarTotalMontagem(itemMontagem, qtd);
    }
  }


  atualizarTotal(itemPedido: any, quantidade: number){
    const total = this.carrinhoService.calcularTotal(itemPedido.produtoPreco, quantidade);
    this.carrinhoService.update(itemPedido.key, quantidade, total);
    this.getTotalPedido();
  }

  atualizarTotalMontagem(itemMontagem: any, quantidade: number){
    const total = this.carrinhoService.calcularTotal(itemMontagem.montagemPreco, quantidade);
    this.carrinhoService.update(itemMontagem.key, quantidade, total);
    this.getTotalPedido();
  }


  removerProduto(itemPedido: any){
    this.alert.ShowConfirmaExclusao(itemPedido.produtoNome, () =>{
      this.carrinhoService.remove(itemPedido.key);
      this.getTotalPedido();
    })

  }

  removerProdutoMontagem(itemMontagem: any){
    this.alert.ShowConfirmaExclusao(itemMontagem.montagemNome, () =>{
      this.carrinhoService.remove(itemMontagem.key);
      this.getTotalPedido();
    })

  }


}
