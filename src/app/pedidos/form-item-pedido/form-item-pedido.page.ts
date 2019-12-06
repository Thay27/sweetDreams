import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/shared/toast.service';
import { CarrinhoService } from 'src/app/carrinho/shared/carrinho.service';
import { ProdutosService } from 'src/app/produtos/shared/produtos.service';

@Component({
  selector: 'app-form-item-pedido',
  templateUrl: './form-item-pedido.page.html',
  styleUrls: ['./form-item-pedido.page.scss'],
})
export class FormItemPedidoPage implements OnInit {
produto: any = {}
form: FormGroup;
total: number = 0;
produtoImg: string;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, private produtosService: ProdutosService,
              private carrinhoService: CarrinhoService,
              private toast: ToastService,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.criarFormulario();
    // comentário...
    let key = this.route.snapshot.paramMap.get('key');
    if (key) {
      const subscribe = this.produtosService.getByKey(key).subscribe( (produto: any) => {
        subscribe.unsubscribe();
        this.produto = produto;
        this.produtoImg = produto.img;
        
        this.form.patchValue({
          produtoKey: produto.key,
          produtoNome: produto.nome,
          produtoDescricao: produto.descricao,
          produtoPreco: produto.preco,
          quantidade: 1,
          peso: 1
        })

        this.executaCalcularTotal();
        this.executaCalcularTotalPeso();

      })
    }

  }

  criarFormulario(){
    this.form = this.formBuilder.group({
      produtoKey: [''],
      produtoNome: [''],
      produtoDescricao: [''],
      produtoPreco: [''],
      quantidade: [''],
      peso: [''],
      observacao: [''],
      total: ['']
    })
  }

  executaCalcularTotal(){
    this.atualizaTotal(this.form.value.quantidade);
  }

  adicionarQuantidade(){
    let qtd = this.form.value.quantidade;
    qtd++;
    this.atualizaTotal(qtd);
  }

  removerQuantidade(){
    let qtd = this.form.value.quantidade;
    qtd--;
    if(qtd <=0)
      qtd=1;

    this.atualizaTotal(qtd);  
  }

  adicionarPeso(){
    let ps = this.form.value.peso;
    ps++;
    this.atualizaTotalP(ps);
  }

  removerPeso(){
    let ps = this.form.value.peso;
    ps--;
    if(ps <=0)
       ps=1;

    this.atualizaTotalP(ps);  
  }

  executaCalcularTotalPeso(){
    this.atualizaTotalP(this.form.value.peso);
  }


  adicionarCarrinho() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (!user) {
        this.toast.show('Por favor, efetue o login para continuar a compra');
      }
    })
  }

  atualizaTotal(quantidade: number){
    this.total = this.produto.preco * quantidade;
    this.form.patchValue({quantidade: quantidade, total: this.total});
  }

  atualizaTotalP(peso: number){
    this.total = this.produto.preco * peso;
    this.form.patchValue({peso: peso, total: this.total});
  }


  onSubmit(){
    if (this.form.valid) {
      this.carrinhoService.insert(this.form.value)
        .then( () => {
          this.toast.show('Produto adicionado com sucesso !!!');
          this.router.navigate(['/catalogo']);
        })
    }
  }

}
